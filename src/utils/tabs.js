function getCurrent() {
  return new Promise(resolve => {
    const query = { active: true, currentWindow: true };
    chrome.tabs.query(query, tabs => resolve(tabs.pop()));
  });
}

function getTabUrl(tab) {
  return new URL(tab.url).hostname;
}

function refreshTab(tab) {
  return new Promise(resolve => {
    chrome.tabs.reload(tab.id, { bypassCache: true }, resolve);
  });
}

export const tabs = {
  getCurrent,
  getTabUrl,
  refreshTab
};