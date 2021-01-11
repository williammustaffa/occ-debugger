import { h } from 'preact';
import { Window, Toolbar, Title, Button } from '@components';
import { useConfigs } from '@contexts/configs';

// Subcomponents
import { Content } from './Content';
import { Footer } from './Footer';

const WINDOW_HEIGHT = 300;
const WINDOW_WIDTH = 350;

export function Popup() {
  const { tab, loading } = useConfigs();

  if (loading) {
    // Loading screen, we can possibly make
    // this logic inside render method
    return <Window height={WINDOW_HEIGHT} width={WINDOW_WIDTH} />
  };

  return (
    <Window height={WINDOW_HEIGHT} width={WINDOW_WIDTH}>
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
