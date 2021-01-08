import { h } from 'preact';
import { Window, Toolbar, Title } from '@components';

// Subcomponents
import { Content } from './Content';
import { FooterActions } from './FooterActions';

export function Popup() {
  return (
    <Window height={400} width={350}>
      <Toolbar header>
        <Title>OCC Debugger</Title>
      </Toolbar>
      <Window.Content>
        <Content />
      </Window.Content>
      <Toolbar footer>
        <FooterActions />
      </Toolbar>
    </Window>
  );
}
