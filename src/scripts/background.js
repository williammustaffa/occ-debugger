import { tabs } from '@utils';

const ports = [];

function notifyPorts(data) {
  ports.forEach(port => {
    port.postMessage(data);
  });
}

chrome.extension.onConnect.addListener(port => {
  if (port.name !== 'occ-debugger') return;

  ports.push(port);

  port.onDisconnect.addListener(() => {
    const portIndex = ports.indexOf(port);
    if (portIndex !== -1) ports.splice(i, portIndex);
  });
});

// You cannot use the chrome.windows api in the devtools.js page.
chrome.windows.onFocusChanged.addListener(async () => {
  // Send message to devtool.js. Then you can re-evaluate ko.dataFor($0)
  const tab = await tabs.getCurrent();
  notifyPorts({ action: 'focus-changed', tab });
});

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo) => {
  // when URL changes notify devtools
  if (changeInfo.url) {
    const tab = await tabs.getCurrent();
    notifyPorts({ action: 'url-changed', tab });
  }
});