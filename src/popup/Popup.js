import { h } from 'preact';
import { useEffect, useMemo, useState } from 'preact/hooks';
import { Header, Title, Button, Footer, FormGroup, Checkbox, Input } from '@components';
import storage from '@utils/storage';
import constants from '@utils/constants';
import { Window, Body } from './Popup.styles';

export default function Popup() {
  const [loading, setLoading] = useState(true);
  const [isDirty, setIsDirty] = useState(false);
  const [configs, setConfigs] = useState({});

  // Load configs
  useEffect(() => {
    const loadConfigs = async () => {
      const loadedConfigs = await storage.getItem(constants.CONFIGS_KEY);
      if (loadedConfigs) {
        setConfigs(loadedConfigs);
      }
      setLoading(false);
    }
    loadConfigs();
  }, []);

  const closePopup = () => window.close();

  const applyConfigs = () => {
    storage.setItem(constants.CONFIGS_KEY, configs);
    setIsDirty(false);
  };

  // Save configs by name
  const updateConfigs = configName => e => {
    const configValue = (
      e.target.type === 'checkbox' ?
      e.target.checked :
      e.target.value
    );

    setConfigs(state => ({
      ...state,
      [configName]: configValue
    }));

    setIsDirty(true);
  };

  if (loading) return null;

  return (
    <Window>
      <Header>
        <Title>OCC Debugger</Title>
      </Header>
      <Body>
        <FormGroup>
          <Input
            label="Target domain"
            defaultValue={configs.domain}
            onBlur={updateConfigs('domain')}
          />
        </FormGroup>
        <Checkbox
          label="Topics"
          checked={configs.topics}
          onChange={updateConfigs('topics')}
        />
        <Checkbox
          label="Spinner"
          checked={configs.spinner}
          onChange={updateConfigs('spinner')}
        />
      </Body>
      <Footer>
        <div className="toolbar-actions">
          <Button onClick={closePopup}>Cancel</Button>
          <Button
            className="pull-right"
            primary
            enabled={isDirty}
            onClick={applyConfigs}
            >Apply
          </Button>
        </div>
      </Footer>
    </Window>
  );
}
