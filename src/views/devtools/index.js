import { tabs, storage, emitter } from '@utils';

// Panels modules
import OCCAnalytics from './OCCAnalytics';
import OCCDebugger from './OCCDebugger';
import OCCLayout from './OCCLayout';

// Messaging between background and devtools
const { onMessage } = emitter.connect('occ-debugger');

// Local management of panels
const panels = [];
const REGISTRY = [OCCDebugger, OCCLayout, OCCAnalytics];

/**
 * Identify if panel is enabled
 *
 * @param {Object} panel 
 * @param {Object} state 
 * @returns 
 */
function _isPanelEnabled(panel, state) {
  return state.configs.options[panel.target.id];
}

/**
 * Set panel message
 *
 * @param {Object} panel 
 * @param {String} message 
 */
function _setPanelMessage(panel, message) {
  panel.sidebar.setObject({ message, __proto__: null });
}

/**
 * Wait for masterviewmodel to have some data loaded
 *
 * @param {Function} callback executed when data is available
 */
function _waitForPageResources(callback) {
  const checkResources = () => {
    chrome.devtools.inspectedWindow.eval(
      `(${(function () {
        try {
          const ko = __non_webpack_require__('knockout');
          ko.contextFor(document.body).$masterViewModel.data.global.user;
          return true;
        } catch(e) {
          return false;
        }
      }).toString()})()`,
      result => result ? callback() : setTimeout(checkResources, 500),
    );
  }

  checkResources();
}

/**
 * Loop though modules and register/create panels
 *
 * @param {Object} state 
 */
 function _register(state) {
  _waitForPageResources(() => {
    for (const target of REGISTRY) {
      chrome.devtools.panels.elements.createSidebarPane(target.name, sidebar => {
        // Register panel
        const panel = { target, sidebar, loaded: false };
        panel.enabled =  _isPanelEnabled(panel, state);
        panels.push(panel);

        _loadPanel(panel, state);
      });
    };
  });
}

/**
 * Loop through panels and update if necessary
 *
 * @param {String} type 
 * @param {Object} state 
 */
function _update(type, state) {
  for (const panel of panels) {
    const shouldUpdate = panel.target.triggers.indexOf(type) > -1;

    if (!shouldUpdate) continue;

    // Update enabled property
    const previousEnabledState = panel.enabled;
    const currentEnableState = _isPanelEnabled(panel, state);

    panel.enabled =  currentEnableState;

    // In case enabled state has changed, rexecute load method
    if (previousEnabledState !== currentEnableState) {
      _loadPanel(panel, state);
    } else {
      _updatePanel(panel, state);
    }
  }
}

/**
 * Initialize panel
 *
 * @param {Object} panel 
 * @param {Object} state 
 */
function _loadPanel(panel, state) {
  const { target, enabled, sidebar } = panel;

  _setPanelMessage(panel, "Initializing...");

  // Initial panel load
  const next = () => {
    panel.loaded = true;
    _updatePanel(panel, state);
  };

  // Execute load method if necessary
  if (typeof target.load === 'function' && enabled) {
    target.load.call(target, sidebar, state, next);
  } else {
    next();
  }
}

/**
 * Update a single panel
 *
 * @param {Object} panel 
 * @param {Object} state 
 */
function _updatePanel(panel, state) {
  const { configs, ready } = state;

  try {
    // Configuration settings
    if (!configs.registered) {
      throw new Error('Unidentified site. Please reload your page and reopen the devtools');
    }

    if (!configs.valid) {
      throw new Error('This is not an OCC site.');
    }

    if (!configs.options.enabled) {
      throw new Error('Extension is disabled on this website.');
    }

    // States
    if (!panel.enabled) {
      throw new Error(`${panel.target.name} is disabled.`);
    }

    if (!panel.loaded) {
      throw new Error('Loading panel...')
    }

    if (!ready) {
      throw new Error('Site is loading...');
    }

    // Wait for page resources
    _waitForPageResources(() => {
      const { target, sidebar } = panel;
      target.update.call(target, sidebar, state);
    });
  } catch(e) {
    _setPanelMessage(panel, e.message);
  }
}

/**
 * Initialize panel life cyle, get tab, options and add listeners
 */
(async function devtools() {
  const state = {};

  state.tab = await tabs.getTabById(chrome.devtools.inspectedWindow.tabId);
  state.configs = await storage.getConfigs(state.tab.domainName);
  state.ready = tabs.isReady(state.tab);

  // Listen to config changes
  const listener = storage.listenConfigs(
    state.tab.domainName,
    changes => {
      state.configs = changes;
      _update('default', state);
    }
  );

  // Listen to current tab changes
  onMessage(async message => {
    const tabId = state.tab.id;

    if (message.tabId !== tabId) return;

    state.tab = await tabs.getTabById(tabId);
    state.configs = await storage.getConfigs(state.tab.domainName);
    state.ready = tabs.isReady(state.tab);

    listener.updateDomain(state.tab.domainName);

    _update('default', state);
  });

  // Listen to element selections
  chrome.devtools.panels.elements.onSelectionChanged
    .addListener(() => _update('selection', state));

  // Add panels
  _register(state);
})();