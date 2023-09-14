function onTabChange(callback) {
  return chrome.tabs.onUpdated.addListener(callback);
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

function executeDevtoolsScript(scriptString, callback) {
  return chrome.devtools.inspectedWindow.eval(scriptString, callback);
}

function getDevtoolsTabId() {
  return chrome.devtools.inspectedWindow.tabId;
}

function getDevtoolsTab() {
  return new Promise(resolve => getTab(getDevtoolsTabId(), resolve));
}

function createDevtoolsSideBarPane(name) {
  return new Promise(resolve => chrome.devtools.panels.elements.createSidebarPane(name, resolve));
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
  getDevtoolsTab,
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
