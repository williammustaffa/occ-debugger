// import extension from '@api/extension';
// import { emitter } from '@utils';
// const { notify } = emitter.create('occ-debugger');

// // You cannot use the chrome.windows api in the devtools.js page.
// chrome.windows.onFocusChanged.addListener(async () => {
//   // Send message to devtool.js. Then you can re-evaluate ko.dataFor($0)
//   const tab = await tabs.getCurrent();
//   const tabId = tab && tab.id;

//   notify({ action: 'focus-changed', tabId });
// });

// extension.onTabChange(async (...props) => {
//   console.log("Tab changed:", props)
//   // when URL changes notify devtools
//   if (changeInfo.status || changeInfo.url) {
//     notify({ action: 'client-sign', tabId, tab, changeInfo });
//   }
// });
