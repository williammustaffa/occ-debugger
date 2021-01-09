import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { storage, tabs } from '@utils';
import { ConfigsContext } from './ConfigsContext';
import { set } from 'lodash';

export function ConfigsProvider({ children }) {
  const [configs, setConfigs] = useState();
  const [tab, setTab] = useState(false);

  // Load configs
  useEffect(() => {
    const configsListener = (changes) => {
      setConfigs(state => ({ ...state, ...changes }))
    };

    const load = async () => {
      const currentTab = await tabs.getCurrent();
      const configs = await storage.getConfigs(currentTab.domainName);

      // Listen to config updates
      storage.listenConfigs(currentTab.domainName, configsListener);

      setConfigs(configs);
      setTab(currentTab);
    };

    load();
  }, []);

  // Save configs by name
  const updateConfigs = configName => configValue => {
    const updatedConfigs = { ...configs };
    set(updatedConfigs, configName, configValue);
    setConfigs(updatedConfigs);
  };

  // Save configs to local storage
  const applyConfigs = () => {
    return storage.setConfigs(tab.domainName, configs);
  };

  return (
    <ConfigsContext.Provider value={{ configs, tab, updateConfigs, applyConfigs }}>
      {configs ? children : 'Loading configuration'}
    </ConfigsContext.Provider>
  )
}