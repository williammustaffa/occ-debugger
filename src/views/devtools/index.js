import extension from '@api/extension';
import { tabs } from '@utils/tabs';
import { storage } from '@utils/storage';
import { helpers } from '@utils/helpers';

// Panels modules
import ChromePanel from './classes/ChromePanel';
import { getContextParser, getResourcesParser } from './parsers';
// import { getR } from './parsers;

/**
 * Wait for masterviewmodel to have some data loaded
 *
 * DO NOT USE MODULES INSIDE extension.executeDevtoolsScript
 * THIS IS INJECTING CODE IN HOST WINDOW
 *
 * @param {Function} callback executed when data is available
 */
function waitForPageResources(configs) {
  const checkResources = resolve => {
    extension.executeDevtoolsScript(
      getResourcesParser(configs),
      result => result ? resolve() : setTimeout(() => checkResources(resolve), 500),
    );
  };

  return new Promise(checkResources);
}

function validateDomainConfigs(configs) {
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
}

async function initializeDevtools() {
  const { domainName } = await tabs.getTabById(extension.getDevtoolsTabId());
  const configs = await storage.getConfigs(domainName);

  const id = 'debuggerPanel';
  const isEnabled = configs.options[id];

  if (isEnabled) {
    await waitForPageResources(configs);

    const panel = new ChromePanel({
      id: 'debuggerPanel',
      name: 'OCC Debugger',
      expression: getContextParser(configs),
    });

    const debounceUpdate = helpers.debounce(() => panel.update(), 100);

    await panel.start();

    try {
      validateDomainConfigs(configs);
      panel.update();
      extension.onDevtoolsElementSelectionChange(debounceUpdate);
    } catch({ message }) {
      panel.setMessage(message);
    }
  }
};

initializeDevtools();