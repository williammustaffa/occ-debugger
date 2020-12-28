const chromeStorage = chrome.storage.local;

function getItem(key, defaultValue, json = true) {
  return new Promise(resolve => {
    chromeStorage.get(key, data => {
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
  chromeStorage.set({ [key]: strConfigs });
}

export const storage = {
  getItem,
  setItem
};