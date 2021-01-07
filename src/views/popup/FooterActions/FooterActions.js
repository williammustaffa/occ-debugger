import { h } from 'preact';
import { Toolbar, Button } from '@components';
import { useConfigs } from '@contexts/configs';
import { tabs } from '@utils';

export function FooterActions() {
  const { configs, tab, applyConfigs } = useConfigs();

  const closePopup = () => window.close();

  // Main button actions
  const buttonText = configs.isReady ? 'Save and Refresh' : 'Refresh';
  const isHidden = configs.isReady && !configs.isValid;
  const isDisabled = configs.isReady && !configs.isDirty;
  const onClick = () => {
    if (configs.isReady) {
      applyConfigs();
    }

    tabs.refreshTab(tab);
  };

  return (
    <Toolbar.Actions>
      <Button onClick={closePopup} pullLeft>Close</Button>
      <Button
        primary
        pullRight
        hidden={isHidden}
        disabled={isDisabled}
        onClick={onClick}
      >{buttonText}</Button>
    </Toolbar.Actions>
  );
}