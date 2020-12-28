import { storage } from '@utils';

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

function initialize(configs) {
  if (configs.enabled) {
    injectConfigs(configs, 'body');
    injectScript(chrome.extension.getURL('scripts/occ-debugger.js'), 'body');
  }
}

// Get configs and initialize
storage.getDomainConfigs(DOMAIN_NAME)
  .then(initialize)
  .catch(console.warn);