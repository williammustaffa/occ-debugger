import extension from '@api/extension';
import { tabs } from '@utils/tabs';
import { storage } from '@utils/storage';
import { helpers } from '@utils/helpers';

// Panels modules
import ChromePanel from './classes/ChromePanel';
import { getContextParser, getResourcesParser } from './parsers';

/**
 * Wait for masterviewmodel to have some data loaded
 *
 * DO NOT USE MODULES INSIDE extension.executeDevtoolsScript
 * THIS IS INJECTING CODE IN HOST WINDOW
 *
 * @param {Function} callback executed when data is available
 */
function waitForPageResources() {
  const checkResources = resolve => {
    extension.executeDevtoolsScript(
      getResourcesParser(),
      result => result ? resolve() : setTimeout(() => checkResources(resolve), 500),
    );
  };

  return new Promise(checkResources);
}

async function initializeDevtools() {
  new ChromePanel({
    id: 'debuggerPanel',
    name: 'OCC Debugger',

    async onStart() {
      const tab = await extension.getDevtoolsTab();
      const domainName = tabs.getTabDomainName(tab);
      const configs = await storage.getConfigs(domainName);
      const isEnabled = configs.options.debuggerPanel;

      this.setEnabled(isEnabled);

      if (isEnabled) {
        await waitForPageResources();
        this.setExpression(getContextParser(configs));
      } else {
        this.setExpression(null);
      }

      this.update();
    },

    async onTabChange(_tabId, changeInfo) {
      const { status, url } = changeInfo;

      // Update domain configs and panel accordingly
      if (typeof url !== 'undefined') {
        const domainName = tabs.getTabDomainName(changeInfo);
        const configs = await storage.getConfigs(domainName);
        const isEnabled = configs.valid && configs.options.debuggerPanel;

        this.setEnabled(isEnabled);

        if (isEnabled) {
          this.setExpression(getContextParser(configs));
        } else {
          this.setLoaded(true);
          this.setExpression(null);
        }
      }

      // Update loaded state for enabled sites
      if (this.enabled) {
        const isSiteLoaded = (status === 'complete');

        if (isSiteLoaded) {
          await waitForPageResources();
        }

        this.setLoaded(isSiteLoaded);
      }

      this.update();
    },

    onElementSeclection: helpers.debounce(function () {
      this.update();
    }, 100),
  });
};

initializeDevtools();