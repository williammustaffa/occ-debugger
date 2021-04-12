import { storage } from '@utils';

function injectConfigs(configs, tag) {
  const node = document.getElementsByTagName(tag)[0];
  const script = document.createElement('script');
  script.setAttribute('type', 'text/javascript');
  script.setAttribute('id', 'occ-debugger-config');
  script.text = 'window._occDebugger = ' + JSON.stringify(configs);
  node.appendChild(script);
}

function injectScript(filePath, tag) {
  const node = document.getElementsByTagName(tag)[0];
  const script = document.createElement('script');
  script.setAttribute('type', 'text/javascript');
  script.setAttribute('id', 'occ-debugger-script');
  script.setAttribute('src', filePath);
  node.appendChild(script);
}

function injectUIContainer() {
  const container = document.createElement('div');
  container.setAttribute('id', 'occ-debugger-ui');
  document.body.appendChild(container);
}

const DOMAIN_NAME = location.hostname;

async function initialize(configs) {
  // Set and sync occ site property
  if (!configs.registered) {
    configs.valid = !!document.getElementById('oracle-cc');
    configs.registered = true;
    await storage.setConfigs(DOMAIN_NAME, configs);
  }

  if (configs.valid && configs.options.enabled) {
    injectConfigs(configs, 'body');
    injectScript(chrome.extension.getURL('scripts/occDebugger.js'), 'body');

    if (configs.options.tagging) {
      // Inject analytics panel
      injectUIContainer();
      injectScript(chrome.extension.getURL('views/storefront/index.js'), 'body');
    }
  }
}

// Get configs and initialize
storage.getConfigs(DOMAIN_NAME)
  .then(initialize)
  .catch(console.warn);