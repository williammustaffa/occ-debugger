import { tabs, storage, emitter } from '@utils';
import OCCDebugger from './OCCDebugger';
import OCCLayout from './OCCLayout';

const REGISTRY = [OCCDebugger, OCCLayout];
const { onMessage } = emitter.connect('occ-debugger');

// Register panels
const panels = [];

function _waitForPageResources(callback) {
  const evaluationScript = `(${(function () {
    try {
      const ko = __non_webpack_require__('knockout');
      ko.contextFor(document.body).$masterViewModel.data.global.user;
      return true;
    } catch(e) {
      return false;
    }
  }).toString()})()`;

  const checkResources = () => {
    chrome.devtools.inspectedWindow.eval(
      evaluationScript,
      result => result ? callback() : setTimeout(checkResources, 500),
    );
  }

  checkResources();
}

// Method to update all panels
function _update(type, data) {
  const { configs, ready } = data;

  for (const panel of panels) {
    const enabled = configs.options[panel.target.id];
    const shouldUpdate = enabled && panel.target.triggers.indexOf(type) > -1;

    if (!shouldUpdate) continue;

    try {
      if (!ready) {
        throw new Error('Processing...');
      }

      if (!configs.registered) {
        throw new Error('Unidentified site. Please reload your page and reopen the devtools');
      }

      if (!configs.valid) {
        throw new Error('This is not an OCC site.');
      }

      if (!configs.options.enabled) {
        throw new Error('OCC Debugger is disabled.');
      }

      // Wait for page resources
      _waitForPageResources(() => {
        panel.target.update(panel.sidebar, data);
      });
    } catch(e) {
      panel.sidebar.setObject({ message: e.message, __proto__: null });
    }
  }
}

// Method to add sidebars and register panels
function _register(data) {
  _waitForPageResources(() => {
    for (const target of REGISTRY) {
      chrome.devtools.panels.elements.createSidebarPane(target.name, sidebar => {
        sidebar.setObject({ message: 'Initializing...', __proto__: null });
        panels.push({ target, sidebar });
        _update('default', data);
      });
    };
  });
}

(async () => {
  const data = {};

  data.tab = await tabs.getTabById(chrome.devtools.inspectedWindow.tabId);
  data.configs = await storage.getConfigs(data.tab.domainName);
  data.ready = tabs.isReady(data.tab);

  // Listen to config changes
  const listener = storage.listenConfigs(
    data.tab.domainName,
    changes => {
      data.configs = changes;
      _update('default', data);
    }
  );

  // Listen to current tab changes
  onMessage(async message => {
    const tabId = data.tab.id;

    if (message.tabId !== tabId) return;

    data.tab = await tabs.getTabById(tabId);
    data.configs = await storage.getConfigs(data.tab.domainName);
    data.ready = tabs.isReady(data.tab);

    listener.updateDomain(data.tab.domainName);

    _update('default', data);
  });

  // Listen to element selections
  chrome.devtools.panels.elements.onSelectionChanged
    .addListener(() => _update('selection', data));

  // Add panels
  _register(data);
})();