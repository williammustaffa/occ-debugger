
function send(namespace, value) {
  chrome.runtime.sendMessage({ namespace, value });
}

function listen(namespace, callback) {
  chrome.runtime.onMessage.addListener(({ namespace: ns, value }) => {
    if (namespace === ns) {
      if (typeof callback === 'function') {
        callback(value);
      }
    }
  });
}

export const emitter = {
  send,
  listen
};