import { h } from 'preact';
import { Toolbar, Button } from '@components';
import { useConfigs } from '@contexts/configs';
import { tabs } from '@utils';

export function Footer() {
  const { configs, tab, applyConfigs } = useConfigs();

  const closePopup = () => window.close();

  const onClick = () => {
    if (configs.registered) {
      applyConfigs();
    }

    tabs.refreshTab(tab);
    window.close();
  };

  // Main button actions
  const buttonText = configs?.registered ? 'Save and Refresh' : 'Refresh';
  const isHidden = !configs || configs.registered && !configs.valid;

  return (
    <Toolbar.Actions>
      <Button onClick={closePopup} pullLeft>Close</Button>
      <Button onClick={() => chrome.storage.local.clear()} pullLeft>Reset configs</Button>
      <Button
        primary
        pullRight
        hidden={isHidden}
        onClick={onClick}
      >{buttonText}</Button>
    </Toolbar.Actions>
  );
}