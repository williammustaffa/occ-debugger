const storage = chrome.storage.local;

function getItem(key, json = true) {
  return new Promise(resolve => {
    storage.get(key, data => {
      const raw = data[key];
  
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
  storage.set({ [key]: strConfigs });
}

export default {
  getItem,
  setItem
};