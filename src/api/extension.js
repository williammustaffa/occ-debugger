function onTabChange(callback) {
  return chrome.tabs.onActivated.addListener(callback);
}

function getURL(path) {
  return chrome.runtime.getURL(path);
}

function sendMessage(message) {
  return chrome.runtime.sendMessage(message);
}

function onMessage(callback) {
  return chrome.runtime.onMessage.addListener(callback);
}

function executeDevtoolsScript(scriptString) {
  return chrome.devtools.inspectedWindow.eval(scriptString);
}

function getDevtoolsTabId() {
  return chrome.devtools.inspectedWindow.tabId;
}

function createDevtoolsSideBarPane(name, callback) {
  return chrome.devtools.panels.elements.createSidebarPane(name, callback);
}

function onDevtoolsElementSelectionChange(callback) {
  return chrome.devtools.panels.elements.onSelectionChanged.addListener(callback);
}

function getExtensionId() {
  return chrome.runtime.id;
}

function getLocalStorageItem(key, callback) {
  return chrome.storage.local.get(key, callback);
}

function setLocalStorageItem(data) {
  return chrome.storage.local.set(data);
}

function onLocalStorageChange(callback) {
  return chrome.storage.onChanged.addListener(callback);
}

function queryTab(query, callback) {
  return chrome.tabs.query(query, callback);
}

function reloadTab(tabId, options, callback) {
  return chrome.tabs.reload(tabId, options, callback);
}

function getTab(tabId, callback) {
  return chrome.tabs.get(tabId, callback);
}

function executeTabScript(tabId, details, callback) {
  return chrome.tabs.executeScript(tabId, details, callback);
}

export default {
  onTabChange,
  getURL,
  sendMessage,
  onMessage,
  executeDevtoolsScript,
  getDevtoolsTabId,
  createDevtoolsSideBarPane,
  onDevtoolsElementSelectionChange,
  getExtensionId,
  getLocalStorageItem,
  setLocalStorageItem,
  onLocalStorageChange,
  queryTab,
  reloadTab,
  getTab,
  executeTabScript,
};
