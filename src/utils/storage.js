import { constants } from '@utils';

// Chrome storage service
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

async function getDomainConfigs(domainName) {
  const allConfigs = await getItem(constants.CONFIGS_KEY, {})
  const domainConfig = allConfigs[domainName] || {};

  return domainConfig;
}

async function saveDomainConfigs(domainName, domainConfigs) {
  const allConfigs = await getItem(constants.CONFIGS_KEY, {})
  allConfigs[domainName] = { ...domainConfigs, domain: domainName };
  await setItem(constants.CONFIGS_KEY, allConfigs);
}

export const storage = {
  getItem,
  setItem,
  getDomainConfigs,
  saveDomainConfigs
};