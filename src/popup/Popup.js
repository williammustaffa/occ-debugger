import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { Toolbar, Title, Button, Checkbox } from '@components';
import { storage, tabs } from '@utils';
import { Content, Section } from './Popup.styles';

export default function Popup() {
  const [configs, setConfigs] = useState();
  const [isDirty, setIsDirty] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentTab, setCurrentTab] = useState(false);

  // Load configs
  useEffect(() => {
    const load = async () => {
      const tab = await tabs.getCurrent();
      const configs = await storage.getDomainConfigs(tab.domainName);

      setConfigs(configs);
      setCurrentTab(tab);
      setLoading(false);
    };

    load();
  }, []);

  const closePopup = () => window.close();

  const applyConfigs = async () => {
    storage.saveDomainConfigs(currentTab.domainName, configs);
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
          <span><strong>Site:</strong> {currentTab.domainName}</span>
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
