/**
 * Note that the injection o scripts are made through script elements because this js runs at a different level from the main js
 * https://developer.chrome.com/docs/extensions/mv3/manifest/content_scripts/#isolated_world
 */
import extension from '@api/extension';
import { storage, constants } from '@utils';

const { TYPE_ADMIN, TYPE_STORE } = constants;

function injectConfigs(configs) {
  const element = document.createElement('div');

  element.setAttribute('id', 'occ-debugger-config');
  element.setAttribute('data-configs', configs);
  element.style.display = 'none';
  element.innerText = JSON.stringify(configs);

  document.body.insertAdjacentElement('afterbegin', element);
}

function injectStorefrontScript(filePath) {
  const script = document.createElement('script');

  script.setAttribute('type', 'text/javascript');
  script.setAttribute('id', 'occ-debugger-script');
  script.setAttribute('src', filePath);

  document.body.insertAdjacentElement('beforeend', script); 
}

function injectAdminScript(filePath) {
  const script = document.createElement('script');

  script.setAttribute('type', 'text/javascript');
  script.setAttribute('id', 'occ-debugger-script');
  script.setAttribute('src', filePath);
  script.setAttribute('async', false);
  script.setAttribute('defer', false);

  // Insert after require js script so it loads before main script
  const requireJsScript = document.querySelector('script[src*="require.js"]');
  requireJsScript.insertAdjacentElement('afterend', script);
}

const DOMAIN_NAME = location.hostname;

const loaderMap = {};

loaderMap[TYPE_ADMIN] = configs => {
  injectConfigs(configs);
  injectAdminScript(extension.getURL('views/ccadmin/index.js'));
};

loaderMap[TYPE_STORE] = configs => {
  injectConfigs(configs);
  injectStorefrontScript(extension.getURL('scripts/occDebugger.js'));

  if (configs.options.tagging) {
    const container = document.createElement('div');
    container.setAttribute('id', 'occ-debugger-ui');
    document.body.appendChild(container);

    injectStorefrontScript(extension.getURL('views/ccstore/index.js'));
  }
};

async function waitForDocumentToLoad(configs) {
  return new Promise(resolve => document.addEventListener('DOMContentLoaded', () => resolve(configs), false));
}

async function setup(configs) {
  // Set and sync occ site property
  if (!configs.registered) {

    // Detect storefront
    if (document.getElementById('oracle-cc')) {
      configs.valid = true;
      configs.registered = true;
      configs.type = TYPE_STORE;

      await storage.setConfigs(DOMAIN_NAME, configs);
    }

    // Detected admin
    if (DOMAIN_NAME.match(/-admin\..*\.oraclecloud\.com/)) {
      configs.valid = true;
      configs.registered = true;
      configs.type = TYPE_ADMIN;

      await storage.setConfigs(DOMAIN_NAME, configs);
    }
  }

  // Information for host level only
  configs.extensionPath = `chrome-extension://${extension.getExtensionId()}/`;

  return configs;
}

async function initialize(configs) {
  if (configs.valid && configs.options.enabled) {
    const loader = loaderMap[configs.type];

    if (loader) {
      loader(configs);
    }
  }
}

// Get configs and initialize
storage.getConfigs(DOMAIN_NAME)
  .then(waitForDocumentToLoad)
  .then(setup)
  .then(initialize)
  .catch(console.warn);