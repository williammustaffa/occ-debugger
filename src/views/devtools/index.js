import { tabs, storage } from '@utils';

function getOCCViewModels(configs) {
  try{
    const occRequire = __non_webpack_require__;

    // Require knockout
    const ko = occRequire('knockout');

    // Requiring occ view model instances
    const order = occRequire('pageLayout/order').getInstance();
    const user = occRequire('pageLayout/user').getInstance();
    const cart = order.cart();

    // Define elements to expose
    const global = { user, order, cart };

    // Get context from current element
    const target = {};

    if ($0) {
      target.context = ko.contextFor($0);
      target.data = ko.dataFor($0);
    }

    return { configs, global, target };
  } catch(e) {
    return { message: 'Something wen\'t wrong' };
  }
}

chrome.devtools.panels.elements.createSidebarPane(
  "OCC Debugger",
  async (sidebar) => {
    const currentTab = await tabs.getCurrent();
    const configs = await storage.getConfigs(currentTab.domainName);

    const updateElementProperties = () => {
      sidebar.setExpression(`(${getOCCViewModels.toString()})(${JSON.stringify(configs)})`);
    };

    updateElementProperties();

    //attach to chrome events so that the sidebarPane refreshes (contains up to date info)
    chrome.devtools.panels.elements.onSelectionChanged.addListener(updateElementProperties);
    sidebar.onShown.addListener(updateElementProperties);
  }
);