var DOMAIN_KEY = 'occ-debugger.domain';
var domainInput = document.getElementById('domain');

chrome.storage.sync.get(DOMAIN_KEY, function(data) {
  domainInput.value = data[DOMAIN_KEY];
});

domainInput.addEventListener('blur', function (e) {
  chrome.storage.sync.set({ [DOMAIN_KEY]: e.target.value });
});
