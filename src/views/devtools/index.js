import { tabs, storage } from '@utils';

function getOCCViewModels(configs) {
  try {
    const occRequire = __non_webpack_require__;

    // Require knockout
    const ko = occRequire('knockout');

    // Get context from current element
    if ($0) {
      const contextFor = ko.contextFor($0);

      if (!contextFor) {
        throw new Error('Selected element has no knockout bindings.')
      }

      const base = configs.options.toJS
        ? ko.toJS(contextFor.$data)
        : {};

      return Object.assign(base, contextFor);
    }

    throw new Error('Please select an element');
  } catch({ message }) {
    return { message, __proto__: null };
  }
}

chrome.devtools.panels.elements.createSidebarPane(
  "OCC Debugger",
  async (sidebar) => {
    const currentTab = await tabs.getCurrent();
    let configs = await storage.getConfigs(currentTab.domainName);

    const updatePanelInformation = () => {
      try {
        if (!configs.registered) {
          throw new Error('Unidentified site. Please reload your page and reopen the devtools');
        }
  
        if (!configs.valid) {
          throw new Error('This is not an OCC site.');
        }
  
        if (!configs.options.enabled) {
          throw new Error('OCC Debugger is disabled.');
        }

        sidebar.setExpression(`(${getOCCViewModels.toString()})(${JSON.stringify(configs)})`);
      } catch({ message }) {
        sidebar.setObject({ configs, message });
      }
    };

    // Listen to configuration changes
    storage.listenConfigs(currentTab.domainName, changes => {
      configs = changes;
      updatePanelInformation();
    });

    // Initial call
    updatePanelInformation();

    // Attach to chrome events so that the sidebarPane refreshes (contains up to date info)
    chrome.devtools.panels.elements.onSelectionChanged.addListener(updatePanelInformation);
    sidebar.onShown.addListener(updatePanelInformation);
  }
);