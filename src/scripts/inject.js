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

chrome.runtime.onMessage.addListener(function (message) {
  const configs = message.data;

  if (!configs.domain) return;

  const siteUrl = location.href;
  const siteRegex = new RegExp(configs.domain);

  if (siteRegex.test(siteUrl) && message.type === 'ready') {
    injectConfigs(configs, 'body');
    injectScript(chrome.extension.getURL('scripts/occDebugger.js'), 'body');
    console.info('Site is listed', siteRegex, siteUrl)
  }
});