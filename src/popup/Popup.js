import { h } from 'preact';
import { Toolbar, Title } from '@components';

// Subcomponents
import { Content } from './Content';
import { FooterActions } from './FooterActions';

export function Popup() {
  return (
    <Toolbar>
      <Toolbar.Header>
        <Title>OCC Debugger</Title>
      </Toolbar.Header>
      <Content />
      <Toolbar.Footer>
        <FooterActions />
      </Toolbar.Footer>
    </Toolbar>
  );
}
