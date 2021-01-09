import { h } from 'preact';
import { Window, Toolbar, Title, Button } from '@components';
import { useConfigs } from '@contexts/configs';

// Subcomponents
import { Content } from './Content';
import { Footer } from './Footer';

export function Popup() {
  const { tab } = useConfigs();

  return (
    <Window height={350} width={350}>
      <Toolbar header>
        <Title>OCC Debugger</Title>
        <Toolbar.Actions centered>
          <Button icon="globe">{tab.domainName}</Button>
        </Toolbar.Actions>
      </Toolbar>
      <Window.Content>
        <Content />
      </Window.Content>
      <Toolbar footer>
        <Footer />
      </Toolbar>
    </Window>
  );
}
