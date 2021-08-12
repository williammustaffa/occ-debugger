import { h } from 'preact';
import { useState } from 'preact/hooks';
import { useStorefront } from '@contexts/storefront';
import { Sidepanel, Toolbar, Title, Button, ButtonGroup, Screen } from '@components';
import logoImage from '@assets/icons/icon16.png';

// Subcomponents
import { TaggingWidgets } from './TaggingWidgets';
import { TaggingEvents } from './TaggingEvents';
import { PageContext } from './PageContext';

const TABS = {
  'Tagging Schema': TaggingWidgets,
  'Tagging Events': TaggingEvents,
  'Page Context': PageContext
};

const ORIENTATIONS = [
  { label: 'Left', value: 'left' },
  { label: 'Bottom', value: 'bottom' },
  { label: 'Right', value: 'right' },
  { label: 'Top', value: 'top' },
];

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
  const [isCollapsed, setIsCollapsed] = useState(getStoredValue('collapsed', true));
  const [activeTab, setActiveTab] = useState(getStoredValue('tab-name', 'Tagging Schema'));
  const [orientation, setOrientation] = useState(getStoredValue('orientation', 'bottom'));
  const { loading } = useStorefront();

  const toggleCollapse = () => {
    setStoredValue('collapsed', !isCollapsed);
    setIsCollapsed(!isCollapsed);
  };

  const updateOrientation = value => () => {
    setStoredValue('orientation', value);
    setOrientation(value);
  };

  const updateTab = tabName => () => {
    setStoredValue('tab-name', tabName);
    setActiveTab(tabName);
  };

  const tabButtons = Object.keys(TABS).map(key => (
    <Button secondary onClick={updateTab(key)} active={activeTab === key}>{key}</Button>
  ));

  const tabComponents = loading ?
    <Screen>Loading initial data</Screen> :
    Object.entries(TABS).map(([tabName, TabContent]) => {
      const isActive = activeTab === tabName;
      return <TabContent active={isActive} />;
    });

  return (
    <Sidepanel
      modal={true}
      width={350}
      collapsed={isCollapsed}
      orientation={orientation}
      actions={[]}
    >
      <Toolbar header>
        <Toolbar.Actions align="right">
          {
            ORIENTATIONS.map(orient => (
              <Button onClick={updateOrientation(orient.value)}>{orient.label}</Button>
            ))
          }
          
        </Toolbar.Actions>
        <Toolbar.Actions alogn="left">
          <img src={logoImage} />
          <ButtonGroup>{tabButtons}</ButtonGroup>
        </Toolbar.Actions>
      </Toolbar>
      {tabComponents}
    </Sidepanel>
  );
};
