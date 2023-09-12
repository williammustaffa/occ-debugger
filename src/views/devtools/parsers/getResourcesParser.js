function parser() {
  try {
    const ko = require('knockout'); //__non_webpack_require__

    const isReady = window.__occDebugger && window.__occDebugger.isReady;
    const isUserLoaded = ko.contextFor(document.body).$masterViewModel.data.global.user;

    return isReady && isUserLoaded;
  } catch(_error) {
    return false;
  }
}

export const getResourcesParser = configs => {
  return `(${parser.toString()})(${JSON.stringify(configs)})`;
}