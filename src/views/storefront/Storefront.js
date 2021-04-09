import { h } from 'preact';
import { Sidebar, Toolbar, Title } from '@components';
import { useStorefront } from '@contexts/storefront';

// Subcomponents
import { Tagging } from './Tagging';
import { useState } from 'preact/hooks';

export function Storefront() {
  const { layout, tagging } = useStorefront();
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleCollapse = () => setIsCollapsed(!isCollapsed);

  return (
    <Sidebar modal={true} width={350} collapsed={isCollapsed}>
      <Toolbar header>
        <Title>OCC Debugger - UI</Title>
      </Toolbar>
      <Sidebar.Content>
        <Tagging />
      </Sidebar.Content>
      <Sidebar.Toggler onClick={toggleCollapse}/>
    </Sidebar>
  );
};
