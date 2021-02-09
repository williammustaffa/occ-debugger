const PORT_NAME = 'occDebugger';

function connect() {
  const port = chrome.runtime.connect({ name: PORT_NAME });

  const sendMessage = message => {
    port.postMessage(message);
  }

  const onMessage = callback => {
    port.onMessage.addListener(callback);
  }

  return { sendMessage, onMessage };
}

function onConnect(callback) {
  chrome.runtime.onConnect.addListener(port => {
    if (port.name !== PORT_NAME) return;
    callback(port);
  });
}

export const emitter = { connect, onConnect };