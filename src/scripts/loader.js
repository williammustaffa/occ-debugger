import { storage, constants } from '@utils';

const { TYPE_ADMIN, TYPE_STORE } = constants;

function injectConfigs(configs) {
  const script = document.createElement('script');

  script.setAttribute('type', 'text/javascript');
  script.setAttribute('id', 'occ-debugger-config');
  script.text = 'window._occDebugger = ' + JSON.stringify(configs);

  document.body.insertAdjacentElement('afterbegin', script);
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
  injectAdminScript(chrome.extension.getURL('views/ccadmin/index.js'));
};

loaderMap[TYPE_STORE] = configs => {
  injectConfigs(configs);
  injectStorefrontScript(chrome.extension.getURL('scripts/occDebugger.js'));

  if (configs.options.tagging) {
    const container = document.createElement('div');
    container.setAttribute('id', 'occ-debugger-ui');
    document.body.appendChild(container);

    injectStorefrontScript(chrome.extension.getURL('views/ccstore/index.js'));
  }
};

async function waitForDocumentToLoad(configs) {
  console.log('Waiting for document to load...');

  return new Promise(resolve => document.addEventListener('DOMContentLoaded', () => resolve(configs), false));
}

async function setup(configs) {
  console.log('Processing configuration...');

  // Set and sync occ site property
  if (!configs.registered) {

    // Detect storefront
    if (document.getElementById('oracle-cc')) {
      configs.valid = true;
      configs.type = TYPE_STORE;

      await storage.setConfigs(DOMAIN_NAME, configs);
    }

    // Detected admin
    if (DOMAIN_NAME.match(/-admin\..*\.oraclecloud\.com/)) {
      configs.valid = true;
      configs.type = TYPE_ADMIN;

      await storage.setConfigs(DOMAIN_NAME, configs);
    }

    configs.registered = true;
  }

  return configs;
}

async function initialize(configs) {
  console.log('Initializing scripts...', configs);

  if (configs.valid && configs.options.enabled) {
    const loader = loaderMap[configs.type];

    if (loader) {
      console.log(`Injecting for ${configs.type}`);
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