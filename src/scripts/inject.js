import storage from 'utils/storage';
import constants from 'utils/constants';

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
  if (!configs) return;

  const siteUrl = location.href;
  const siteRegex = new RegExp(configs.domain);

  if (siteRegex.test(siteUrl)) {
    injectConfigs(configs, 'body');
    injectScript(chrome.extension.getURL('scripts/occ-debugger.js'), 'body');
    console.info('Site is listed', siteUrl)
  } else {
    console.info('Site is not listed', siteUrl)
  }
}

// Get configs and initialize
storage.getItem(constants.CONFIGS_KEY)
  .then(initialize)
  .catch(console.warn);