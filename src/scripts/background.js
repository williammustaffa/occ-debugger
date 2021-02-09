import { tabs } from '@utils';

// You cannot use the chrome.windows api in the devtools.js page.
chrome.windows.onFocusChanged.addListener(async () => {
  // Send message to devtool.js. Then you can re-evaluate ko.dataFor($0)
  const tab = await tabs.getCurrent();
  chrome.runtime.sendMessage(tab.id, { action: 'tab-updated', tab });
});

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo) => {
  // when URL changes notify devtools
  if (changeInfo.url) {
    const tab = await tabs.getCurrent();
    chrome.runtime.sendMessage(tab.id, { action: 'tab-updated', tab });
  }
});