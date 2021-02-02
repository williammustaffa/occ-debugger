
// You cannot use the chrome.windows api in the devtools.js page.
chrome.windows.onFocusChanged.addListener(windowId => {
  // Send message to devtool.js. Then you can re-evaluate ko.dataFor($0)
  chrome.tabs.getSelected(null, tab => {
    chrome.tabs.sendMessage(tab.id, {});
  });
});

