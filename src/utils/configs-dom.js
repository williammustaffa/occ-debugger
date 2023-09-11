export function getDOMConfigs() {
  if (!window.hasOwnProperty('__occDebugger')) {
    try {
      const element = document.getElementById('occ-debugger-config');
      const elementContent = element.innerText;
      const configs = JSON.parse(elementContent);

      element.remove();

      window.__occDebugger = configs;
    } catch(e) {
      console.error('occ debugger error loading configs')
      return {};
    }
  }

  return window.__occDebugger || {};
}

export function setDOMConfigs(configs) {
  window.__occDebugger = configs;
}