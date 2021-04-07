function _processTab(tab) {
  if (tab) tab.domainName = _getTabUrl(tab);
  return tab;
}

function _getTabUrl(tab) {
  if (!tab.url) return '';
  return new URL(tab.url).hostname;
}

function getCurrent() {
  return new Promise((resolve) => {
    const query = { active: true, currentWindow: true };

    chrome.tabs.query(query, tabs => {
      resolve(_processTab(tabs.pop()));
    });
  });
}

function refreshTab(tab) {
  return new Promise(resolve => {
    chrome.tabs.reload(tab.id, { bypassCache: true }, resolve);
  });
}

function getTabById(id) {
  return new Promise(resolve => {
    chrome.tabs.get(id, tab => {
      resolve(_processTab(tab));
    });
  });
}

function isReady(tab) {
  if (!tab) return false;
  return tab.status === 'complete';
}

export const tabs = {
  getCurrent,
  getTabById,
  isReady,
  refreshTab
};