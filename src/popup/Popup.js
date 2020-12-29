import { h, Fragment } from 'preact';
import { useEffect, useMemo, useState } from 'preact/hooks';
import { Toolbar, Title, Button, Checkbox } from '@components';
import { storage, tabs } from '@utils';
import { Content, Section, OverlayInfo } from './Popup.styles';

// TODO move utils to custom hooks
export default function Popup() {
  const [configs, setConfigs] = useState({});
  const [isDirty, setIsDirty] = useState(false);
  const [currentTab, setCurrentTab] = useState(false);

  // Load configs
  useEffect(() => {
    const load = async () => {
      const tab = await tabs.getCurrent();
      const configs = await storage.getConfigs(tab.domainName);

      // Listen to config updates
      storage.listenConfigs(
        tab.domainName,
        changes => setConfigs(state => ({ ...state, ...changes }))
      );

      setConfigs(configs);
      setCurrentTab(tab);
    };

    load();
  }, []);

  const closePopup = () => window.close();
  const refreshPage = () => tabs.refreshTab(currentTab);

  const applyConfigs = async () => {
    storage.setConfigs(currentTab.domainName, configs);
    refreshPage();
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

  // TODO: separate into components
  const content = useMemo(() => {
    if (!configs.isValid) {
      return (
        <Content centered height={100}>
          <div>This is not an OCC site.</div>
        </Content>
      );
    }

    if (!configs.isReady) {
      return (
        <Content centered height={100}>
          <div>Please refresh your tab!</div>
        </Content>
      );
    }

    return (
      <Fragment>
        <Section>
          <div><strong>Site:</strong> {currentTab.domainName}</div>
          <div><strong>OCC Site:</strong> {`${configs.isValid}`}</div>
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
      </Fragment>
    )
  }, [configs, currentTab, updateConfigs])

  const footer = useMemo(() => {
    return (
      <Toolbar.Actions>
        <Button onClick={closePopup} pullLeft>Close</Button>
        <Button
          primary
          pullRight
          disabled={configs.isReady && !isDirty}
          onClick={configs.isReady ? applyConfigs : refreshPage}
        >{configs.isReady ? 'Save and Refresh' : 'Refresh'}
        </Button>
      </Toolbar.Actions>
    )
  }, [configs, closePopup, applyConfigs, refreshPage])

  return (
    <Toolbar>
      <Toolbar.Header>
        <Title>OCC Debugger</Title>
      </Toolbar.Header>
      <Content>{content}</Content>
      <Toolbar.Footer>{footer}</Toolbar.Footer>
    </Toolbar>
  );
}
