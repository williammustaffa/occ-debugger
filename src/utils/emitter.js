function connect(name) {
  const port = chrome.runtime.connect({ name });

  const sendMessage = message => {
    port.postMessage(message);
  }

  const onMessage = callback => {
    port.onMessage.addListener(callback);
  }

  return { sendMessage, onMessage };
}

function create(name) {
  const ports = [];

  // Listen no new connections
  chrome.extension.onConnect.addListener(port => {
    if (port.name !== name) return;

    // Register new port
    ports.push(port);

    // Clear disconnected ports
    port.onDisconnect.addListener(() => {
      const portIndex = ports.indexOf(port);
      if (portIndex !== -1) ports.splice(portIndex, 1);
    });
  });

  // Create method for notifying connected ports
  const notify = (data, delay = 0) => {
    ports.forEach(port => {
      setTimeout(() => port.postMessage(data), delay);
    });
  }

  return { notify };
}


export const emitter = { connect, create };