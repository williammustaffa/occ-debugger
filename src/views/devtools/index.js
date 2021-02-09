import { tabs, storage } from '@utils';
import { getParser } from './parser';

chrome.devtools.panels.elements.createSidebarPane(
  "OCC Debugger",
  async (sidebar) => {
    let currentTab = await tabs.getCurrent();
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

        sidebar.setExpression(getParser(configs));
      } catch({ message }) {
        sidebar.setObject({ configs, message });
      }
    };

    // Listen to configuration changes
    const configListener = storage.listenConfigs(currentTab.domainName, changes => {
      configs = changes;
      updatePanelInformation();
    });

    // Listen to tab changes
    chrome.extension.onMessage.addListener(async () => {
      currentTab = await tabs.getCurrent();
      configs = await storage.getConfigs(currentTab.domainName);

      configListener.updatedomain(currentTab.domainName);
      updatePanelInformation();
    });

    // Attach to chrome events so that the sidebarPane refreshes (contains up to date info)
    chrome.devtools.panels.elements.onSelectionChanged.addListener(updatePanelInformation);
    sidebar.onShown.addListener(updatePanelInformation);

    // Initial call
    updatePanelInformation();
  }
);