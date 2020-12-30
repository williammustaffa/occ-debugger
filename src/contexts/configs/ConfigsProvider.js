import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { storage, tabs } from '@utils';
import { ConfigsContext } from './ConfigsContext';


export function ConfigsProvider({ children }) {
  const [configs, setConfigs] = useState({});
  const [tab, setTab] = useState(false);

  // Load configs
  useEffect(() => {
    const load = async () => {
      const currentTab = await tabs.getCurrent();
      const configs = await storage.getConfigs(currentTab.domainName);

      // Listen to config updates
      storage.listenConfigs(
        tab.domainName,
        changes => setConfigs(state => ({ ...state, ...changes }))
      );

      setConfigs({ ...configs, isDirty: false });
      setTab(currentTab);
    };

    load();
  }, []);

  // Save configs by name
  const updateConfigs = configName => e => {
    const configValue = (
      e.target.type === 'checkbox' ?
      e.target.checked :
      e.target.value
    );

    const changes = {
      isDirty: true,
      [configName]: configValue
    };

    // Updating configs only on component
    setConfigs(state => ({ ...state, ...changes }));
  };

  // Save configs to local storage
  const applyConfigs = async () => {
    return storage.setConfigs(tab.domainName, configs);
  };

  return (
    <ConfigsContext.Provider value={{configs, tab, updateConfigs, applyConfigs }}>
      {children}
    </ConfigsContext.Provider>
  )
}