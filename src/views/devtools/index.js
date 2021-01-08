import { tabs, storage } from '@utils';

function getOCCViewModels(configs) {
  try {
    const occRequire = __non_webpack_require__;

    // Require knockout
    const ko = occRequire('knockout');

    // Get context from current element
    const target = {};

    if ($0) {
      target.context = ko.contextFor($0);
      target.data = ko.dataFor($0);
    }

    return { configs, target };
  } catch(e) {
    return { message: 'Something wen\'t wrong', error: e };
  }
}

chrome.devtools.panels.elements.createSidebarPane(
  "OCC Debugger",
  async (sidebar) => {
    const currentTab = await tabs.getCurrent();
    const configs = await storage.getConfigs(currentTab.domainName);

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

      const updateElementProperties = () => {
        sidebar.setExpression(`(${getOCCViewModels.toString()})(${JSON.stringify(configs)})`);
      };

      updateElementProperties();

      // Attach to chrome events so that the sidebarPane refreshes (contains up to date info)
      chrome.devtools.panels.elements.onSelectionChanged.addListener(updateElementProperties);
      sidebar.onShown.addListener(updateElementProperties);
    } catch({ message }) {
      sidebar.setObject({ configs, message });
    }
  }
);