import { tabs, emitter } from '@utils';

const { notify } = emitter.create('occ-debugger');

// // You cannot use the chrome.windows api in the devtools.js page.
// chrome.windows.onFocusChanged.addListener(async () => {
//   // Send message to devtool.js. Then you can re-evaluate ko.dataFor($0)
//   const tab = await tabs.getCurrent();
//   const tabId = tab && tab.id;

//   notify({ action: 'focus-changed', tabId });
// });

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo) => {
  // when URL changes notify devtools
  if (
    (changeInfo.favIconUrl && /od\=/gi.test(changeInfo.favIconUrl)) ||
    changeInfo.status ||
    changeInfo.url
  ) {
    notify({ action: 'client-sign', tabId, changeInfo });
  }
});