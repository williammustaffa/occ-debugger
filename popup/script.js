const CONFIGS_KEY = 'occ-debugger.configs';

// Elements
const domainInput = document.getElementById('domain');

chrome.storage.sync.get(CONFIGS_KEY, function (data) {
  if (data[CONFIGS_KEY]) {
    const configs = JSON.parse(data[CONFIGS_KEY]);

    if (configs && configs.domain) {
      domainInput.value = configs.domain;
    }
  }
});

domainInput.addEventListener('blur', function (e) {
  const strConfigs = JSON.stringify({ domain: e.target.value });
  chrome.storage.sync.set({ [CONFIGS_KEY]: strConfigs });
});
