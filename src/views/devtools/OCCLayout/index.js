import { tabs, storage } from '@utils';
import { getParser } from './parser';

const port = chrome.runtime.connect({ name: 'occ-debugger' });

chrome.devtools.panels.elements.createSidebarPane(
  "OCC Layout",
  async sidebar => {
    const tabId = chrome.devtools.inspectedWindow.tabId;

    let currentTab = await tabs.getTabById(tabId);
    let configs = await storage.getConfigs(currentTab.domainName);
    let details = null;

    const updatePanelInformation = () => {
      try {
        if (!details) {
          throw new Error('Json file was not loaded...');
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

    // Loading analytics.json file for analytcs panel
    chrome.devtools.network.onRequestFinished.addListener(
      async ({ request, getContent }) => {
        if (request.url.match(/analytics\/main\.json/)) {
          getContent(content => {
            details = JSON.parse(content);
            updatePanelInformation();
          });
        }
      }
    );
  }
);