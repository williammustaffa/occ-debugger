const INITIAL_CONFIGS = {
  registered: false,
  valid: false,
  options: {
    enabled: false,
    topics: false,
    spinner: false,
    toJS: false
  }
};

function getItem(key, defaultValue, json = true) {
  return new Promise(resolve => {
    chrome.storage.local.get(key, data => {
      const raw = data[key] || defaultValue;

      if (json && typeof raw === 'string') {
        try {
          const jsonContent = JSON.parse(data[key]);
          return resolve(jsonContent);
        } catch(e) {
          console.warn(e);
        }
      }

      return resolve(raw);
    });
  })
}

function setItem(key, value, json = true) {
  const strConfigs = json ? JSON.stringify(value) : value;
  chrome.storage.local.set({ [key]: strConfigs });
}

function getConfigs(domainName) {
  return getItem(domainName, INITIAL_CONFIGS);
}

function setConfigs(domainName, domainConfigs) {
  return setItem(domainName, domainConfigs);
}

function listenConfigs(domainName, callback) {
  chrome.storage.onChanged.addListener(changes => {
    const domainChanges = changes[domainName]?.newValue;

    if (domainChanges) {
      try {
        const newConfigs = JSON.parse(domainChanges);

        if (typeof callback === 'function') {
          callback(newConfigs);
        }
      } catch(e) {
        console.warn(`Error parsing configuration data for domain ${domainName}`);
      }
    }
  });
}

export const storage = {
  getItem,
  setItem,
  getConfigs,
  setConfigs,
  listenConfigs
};