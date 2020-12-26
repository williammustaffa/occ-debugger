import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';

const storage = chrome.storage.sync;

const CONFIGS_KEY = 'occ-debugger.configs';
const DEFAULT_CONFIGS = {
  domain: '',
  topics: false,
  spinner: false
};

export default function Popup() {
  const [loading, setLoading] = useState(true);
  const [configs, setConfigs] = useState(DEFAULT_CONFIGS);

  // Load configs
  useEffect(() => {
    storage.get(CONFIGS_KEY, function (data) {
      if (data[CONFIGS_KEY]) {
        const configs = JSON.parse(data[CONFIGS_KEY]);
        if (configs) {
          setConfigs(configs);
        }
        setLoading(false);
      }
    });
  }, []);

  // Sync configs to storage
  useEffect(() => {
    if (loading) return;
    const strConfigs = JSON.stringify(configs);
    storage.set({ [CONFIGS_KEY]: strConfigs });
  }, [configs]);

  // Save configs by name
  const updateConfigs = configName => e => {
    setConfigs(state => ({
      ...state,
      [configName]: e.target.value
    }));
  }

  if (loading) return;

  return (
    <div>
      <span>{configs.domain}</span>
      <input
        id="domain"
        type="text"
        defaultValue={configs.domain}
        onBlur={updateConfigs('domain')}
      />
    </div>
  );
}
