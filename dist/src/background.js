const CONFIGS_KEY = 'occ-debugger.configs';

chrome.storage.sync.get(CONFIGS_KEY, function (data) {
  let configs = {};

  if (data[CONFIGS_KEY]) {
    configs = JSON.parse(data[CONFIGS_KEY]);
  }

  chrome.tabs.onUpdated.addListener(function(tab, info) {
    if (info.status === 'complete') {
      // Notify subscribers
      chrome.tabs.sendMessage(tab, { type: "ready", data: configs });
    }
  });
});