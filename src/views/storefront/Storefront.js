import { h } from 'preact';
import { Sidebar, Toolbar, Title } from '@components';
import { useStorefront } from '@contexts/storefront';

// Subcomponents
import { Analytics } from './Analytics';

export function Storefront() {
  const { layout, tagging } = useStorefront();

  return (
    <Sidebar modal={true} width={350}>
      <Toolbar header>
        <Title>OCC Debugger - UI</Title>
      </Toolbar>
      <Sidebar.Content>
        <Analytics />
      </Sidebar.Content>
    </Sidebar>
  );
}
