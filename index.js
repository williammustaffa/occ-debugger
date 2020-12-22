var DOMAIN_KEY = 'occ-debugger.domain';

chrome.tabs.onUpdated.addListener(function(tab, info) {
  if (info.status === 'complete') {
    chrome.storage.sync.get(DOMAIN_KEY, function (data) {
      // TODO: change way configs are store, maybe save all configs together
      const configs = {
        domain: data[DOMAIN_KEY],
      }

      chrome.tabs.executeScript(
        { code: 'var occDebuggerConfigs = ' + JSON.stringify(configs) },
        () => { chrome.tabs.executeScript({ file: "scripts/occ-debugger.js" }) }
      )
    });

  }
});