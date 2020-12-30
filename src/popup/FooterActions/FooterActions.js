import { h } from 'preact';
import { Toolbar, Button } from '@components';
import { useConfigs } from '@contexts/configs';

export function FooterActions() {
  const { configs, applyConfigs } = useConfigs();

  const closePopup = () => window.close();
  const refreshPage = () => tabs.refreshTab(tab);

  return (
    <Toolbar.Actions>
      <Button onClick={closePopup} pullLeft>Close</Button>
      <Button
        primary
        pullRight
        hidden={configs.isReady && !configs.isValid}
        disabled={configs.isReady && !configs.isDirty}
        onClick={configs.isReady ? applyConfigs : refreshPage}
      >{configs.isReady ? 'Save and Refresh' : 'Refresh'}
      </Button>
    </Toolbar.Actions>
  );
}