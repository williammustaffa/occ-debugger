import { h } from 'preact';
import { Sidebar, Toolbar, Title, Button, ButtonGroup } from '@components';

// Subcomponents
import { Tagging } from './Tagging';
import { useState } from 'preact/hooks';

export function Storefront() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => setIsCollapsed(!isCollapsed);

  return (
    <Sidebar modal={true} width={350} collapsed={isCollapsed}>
      <Toolbar header>
        <Title>OCC Debugger - UI</Title>
        <Toolbar.Actions centered>
          <ButtonGroup>
            <Button>Widgets Tagging</Button>
            <Button>Tagging Events</Button>
          </ButtonGroup>
        </Toolbar.Actions>
      </Toolbar>
      <Sidebar.Content>
        <Tagging />
      </Sidebar.Content>
      <Sidebar.Toggler onClick={toggleCollapse} collapsed={isCollapsed}/>
    </Sidebar>
  );
};
