import { tabs, storage, emitter, helpers } from '@utils';

// Panels modules
import OCCDebugger from './OCCDebugger';

// Messaging between background and devtools
const { onMessage } = emitter.connect('occ-debugger');

// Local management of panels
const panels = [];
const REGISTRY = [OCCDebugger];

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
    /**
     * DO NOT USE MODULES INSIDE THIS CODE
     * THIS IS INJECTING CODE IN HOST WINDOW
     */
    chrome.devtools.inspectedWindow.eval(
      `(${(function () {
        try {
          const ko = require('knockout'); //__non_webpack_require__

          const isReady = window.__occDebugger && window.__occDebugger.isReady;
          const isUserLoaded = ko.contextFor(document.body).$masterViewModel.data.global.user;

          return isReady && isUserLoaded;
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
        const panel = { target, sidebar, loaded: false, error: null };
        panel.enabled = _isPanelEnabled(panel, state);
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
    if (previousEnabledState !== currentEnableState || panel.error) {
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
    panel.error = null;
    _updatePanel(panel, state);
  };

  const fail = error => {
    panel.loaded = false;
    panel.error = error || 'Failed loading panel... Refresh the page to retry';
    _updatePanel(panel, state);
  }

  // Execute load method if necessary
  if (typeof target.load === 'function' && enabled) {
    target.load.call(target, sidebar, state, next, fail);
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
    if (panel.error) {
      throw new Error(panel.error);
    }

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

// Create debouce methods
const _updateDebounced = helpers.debounce(_update, 100);

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
      _updateDebounced('default', state);
    }
  );

  // Listen to current tab changes
  onMessage(
    async message => {
      const tabId = state.tab.id;

      if (message.tabId !== tabId) return;

      state.tab = await tabs.getTabById(tabId);
      state.configs = await storage.getConfigs(state.tab.domainName);
      state.ready = message.changeInfo.hasOwnProperty('status')
        ? message.changeInfo.status === 'complete'
        : state.ready;

      listener.updateDomain(state.tab.domainName);

      _updateDebounced('default', state);
    }
  );

  // Listen to element selections
  chrome.devtools.panels.elements.onSelectionChanged
    .addListener(() => _updateDebounced('selection', state));

  // Add panels
  _register(state);
})();