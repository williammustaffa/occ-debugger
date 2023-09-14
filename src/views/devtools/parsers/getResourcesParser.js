function parser() {
  try {
    const ko = require('knockout');

    const isReady = window.__occDebugger && window.__occDebugger.isReady;
    const isUserLoaded = ko.contextFor(document.body).$masterViewModel.data.global.user;

    return isReady && isUserLoaded;
  } catch(_error) {
    return false;
  }
}

export const getResourcesParser = () => {
  return `(${parser.toString()})()`;
}