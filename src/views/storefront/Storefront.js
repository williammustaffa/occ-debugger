import { h } from 'preact';
import { useState } from 'preact/hooks';
import { useStorefront } from '@contexts/storefront';
import { Sidebar, Toolbar, Title, Button, ButtonGroup, Screen } from '@components';

// Subcomponents
import { TaggingWidgets } from './TaggingWidgets';
import { TaggingEvents } from './TaggingEvents';

const tabs = {
  'Tagging Schema': TaggingWidgets,
  'Tagging Events': TaggingEvents
};

export function Storefront() {  
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('Tagging Schema');
  const [orientation, setOrientation] = useState('right');
  const { loading } = useStorefront();

  const toggleCollapse = () => setIsCollapsed(!isCollapsed);
  const toggleOrientation = () => setOrientation(orientation === 'right' ? 'left' : 'right');
  const updateTab = tabName => () => setActiveTab(tabName);

  const tabButtons = Object.keys(tabs).map(key => (
    <Button secondary onClick={updateTab(key)} active={activeTab === key}>{key}</Button>
  ));

  const tabComponents = loading ?
    <Screen>Loading initial data</Screen> :
    Object.entries(tabs).map(([tabName, TabContent]) => {
      const isActive = activeTab === tabName;
      return <TabContent active={isActive} />;
    });

  return (
    <Sidebar
      modal={true}
      width={350}
      collapsed={isCollapsed}
      orientation={orientation}
      actions={[
        <Sidebar.Toggler onClick={toggleCollapse} rotate={isCollapsed ? 0 : 45} icon="plus"/>,
        <Sidebar.Toggler onClick={toggleOrientation} hide={isCollapsed} icon="switch"/>
      ]}
    >
      <Toolbar header>
        <Title>OCC Debugger - UI</Title>
        <Toolbar.Actions centered>
          <ButtonGroup>{tabButtons}</ButtonGroup>
        </Toolbar.Actions>
      </Toolbar>
      {tabComponents}
    </Sidebar>
  );
};
