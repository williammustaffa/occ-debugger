import { h } from 'preact';
import { Toolbar, Title, Window, WindowContent } from 'photon-preact';

// Subcomponents
import { Content } from './Content';
import { FooterActions } from './FooterActions';

export function Popup() {
  return (
    <Window>
      <Toolbar header>
        <Title>OCC Debugger</Title>
      </Toolbar>
      <WindowContent>
        <Content />
      </WindowContent>
      <Toolbar footer>
        <FooterActions />
      </Toolbar>
    </Window>
  );
}
