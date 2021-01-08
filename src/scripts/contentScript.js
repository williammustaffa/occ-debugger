import { storage, emitter } from '@utils';

const DOMAIN_NAME = location.hostname;

function injectConfigs(configs, tag) {
  const node = document.getElementsByTagName(tag)[0];
  const script = document.createElement('script');
  script.setAttribute('type', 'text/javascript');
  script.setAttribute('id', 'occ-debugger-config');
  script.text = 'window.occDebuggerConfigs = ' + JSON.stringify(configs);
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

async function initialize(configs) {
  // Set and sync occ site property
  if (!configs.hasOwnProperty('isReady')) {
    configs.isValid = !!document.getElementById('oracle-cc');
    configs.isReady = true;
    await storage.setConfigs(DOMAIN_NAME, configs);
  }

  if (configs.isValid && configs.enabled) {
    injectConfigs(configs, 'body');
    injectScript(chrome.extension.getURL('scripts/occDebugger.js'), 'body');
  }
}

// Get configs and initialize
storage.getConfigs(DOMAIN_NAME)
  .then(initialize)
  .catch(console.warn);