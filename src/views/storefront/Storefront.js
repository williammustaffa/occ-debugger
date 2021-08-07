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

function getStoredValue(key, defaultValue, boolean) {
  const value = localStorage.getItem(`occ-debugger-${key}`);

  if (typeof value !== 'string') {
    return defaultValue;
  }

  // Need to change this and how we are persisting this data
  if (value === "true") return true;
  if (value === "false") return false;

  return value;
}

function setStoredValue(key, value) {
  localStorage.setItem(`occ-debugger-${key}`, value);
}

export function Storefront() {  
  const [isCollapsed, setIsCollapsed] = useState(getStoredValue('collapsed', false));
  const [activeTab, setActiveTab] = useState(getStoredValue('tab-name', 'Tagging Schema'));
  const [orientation, setOrientation] = useState(getStoredValue('orientation', 'right'));
  const { loading } = useStorefront();

  const toggleCollapse = () => {
    setStoredValue('collapsed', !isCollapsed);
    setIsCollapsed(!isCollapsed);
  };

  const toggleOrientation = () => {
    const newOrientation = orientation === 'right' ? 'left' : 'right';
    setStoredValue('orientation', newOrientation);
    setOrientation(newOrientation);
  };

  const updateTab = tabName => () => {
    setStoredValue('tab-name', tabName);
    setActiveTab(tabName);
  };

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
    <Sidebar>
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
