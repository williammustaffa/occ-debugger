import { tabs, storage } from '@utils';
import { getParser } from './parser';

const port = chrome.runtime.connect({ name: 'occ-debugger' });

chrome.devtools.panels.elements.createSidebarPane(
  "OCC Debugger",
  async (sidebar) => {
    const tabId = chrome.devtools.inspectedWindow.tabId;

    let currentTab = await tabs.getTabById(tabId);
    let configs = await storage.getConfigs(currentTab.domainName);
    let ready = tabs.isReady(currentTab);

    const updatePanelInformation = () => {
      try {
        if (!ready) {
          throw new Error('Site is loading. Please wait...');
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

        sidebar.setExpression(getParser(configs));
      } catch({ message }) {
        sidebar.setObject({ message });
      }
    };

    // Listen to configuration changes
    const configListener = storage.listenConfigs(currentTab.domainName, changes => {
      configs = changes;
      updatePanelInformation();
    });

    // Listen to current tab changes
    port.onMessage.addListener(async data => {
      if (data.tabId !== tabId) return;

      currentTab = await tabs.getTabById(tabId);
      configs = await storage.getConfigs(currentTab.domainName);
      ready = tabs.isReady(currentTab);

      configListener.updateDomain(currentTab.domainName);

      updatePanelInformation();
    });

    // Attach to chrome events so that the sidebarPane refreshes (contains up to date info)
    chrome.devtools.panels.elements.onSelectionChanged.addListener(updatePanelInformation);
    sidebar.onShown.addListener(updatePanelInformation);

    // Initial call
    updatePanelInformation();
  }
);