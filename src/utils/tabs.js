function getCurrent() {
  return new Promise((resolve, reject) => {
    const query = { active: true };

    chrome.tabs.query(query, tabs => {
      const tab = tabs.length && tabs.pop();
      tab.domainName = tab && getTabUrl(tab);
      resolve(tab);
    });
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