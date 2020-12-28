import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { Toolbar, Title, Button, Checkbox } from '@components';
import { storage, constants, tabs } from '@utils';
import { Content, Section } from './Popup.styles';

export default function Popup() {
  const [loading, setLoading] = useState(true);
  const [isDirty, setIsDirty] = useState(false);
  const [configs, setConfigs] = useState({});
  const [currentTab, setCurrentTab] = useState(false);

  // Load configs
  useEffect(() => {
    const load = async () => {
      const tab = await tabs.getCurrent();
      const configs = await storage.getItem(constants.CONFIGS_KEY, {});

      setConfigs({
        ...configs,
        domain: tabs.getTabUrl(tab)
      });

      setCurrentTab(tab);
      setLoading(false);
    };

    load();
  }, []);

  const closePopup = () => window.close();

  const applyConfigs = async () => {
    storage.setItem(constants.CONFIGS_KEY, configs);
    tabs.refreshTab(currentTab);
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
    <Toolbar>
      <Toolbar.Header>
        <Title>OCC Debugger</Title>
      </Toolbar.Header>
      <Content>
        <Section>
          <span>Site: {tabs.getTabUrl(currentTab)}</span>
          <Checkbox
            label="Enabled"
            checked={configs.enabled}
            onChange={updateConfigs('enabled')}
          />
        </Section>
        <Section>
          <Title>Logging</Title>
          <Checkbox
            disabled={!configs.enabled}
            label="Topics"
            checked={configs.topics}
            onChange={updateConfigs('topics')}
          />
          <Checkbox
            disabled={!configs.enabled}
            label="Spinner"
            checked={configs.spinner}
            onChange={updateConfigs('spinner')}
          />
        </Section>
      </Content>
      <Toolbar.Footer>
        <Toolbar.Actions>
          <Button onClick={closePopup} pullLeft>Close</Button>
          <Button
            primary
            pullRight
            disabled={!isDirty}
            onClick={applyConfigs}
            >Save and Refresh
          </Button>
        </Toolbar.Actions>
      </Toolbar.Footer>
    </Toolbar>
  );
}
