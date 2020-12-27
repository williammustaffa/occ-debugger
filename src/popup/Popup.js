import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { Header, Title, Button, Form, Footer } from 'preact-photon';
import storage from 'utils/storage';
import constants from 'utils/constants';
import { Window, Body } from './Popup.styles';

export default function Popup() {
  const [loading, setLoading] = useState(true);
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
  };

  if (loading) return null;

  return (
    <Window>
      <Header>
        <Title>OCC Debugger</Title>
      </Header>
      <Body>
        <Form>
          <div class="form-group">
            <label>Target domain</label>
            <input
              id="domain"
              type="text"
              className="form-control"
              defaultValue={configs.domain}
              onBlur={updateConfigs('domain')}
            />
          </div>
          <Form.CheckBox
            label="Topics"
            checked={configs.topics}
            onChange={updateConfigs('topics')}
          />
          <Form.CheckBox
            label="Spinner"
            checked={configs.spinner}
            onChange={updateConfigs('spinner')}
          />
        </Form>
      </Body>
      <Footer>
        <div className="toolbar-actions">
          <Button onClick={closePopup}>Cancel</Button>
          <Button
            class="pull-right"
            primary
            onClick={applyConfigs}
            >Apply
          </Button>
        </div>
      </Footer>
    </Window>
  );
}
