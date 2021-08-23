import { h } from 'preact';
import { useState } from 'preact/hooks';
import { useStorefront } from '@contexts/storefront';
import {
  Window,
  Toolbar,
  Button,
  ButtonGroup,
  Screen
} from '@components';
import { OrientationIcon } from './Storefront.styles';

// Subcomponents
import { Tagging } from './Tagging';
import { PageContext } from './PageContext';
import { Events } from './Events';

// Assets
import logoImage from '@assets/icons/icon16.png';

const TABS = {
  'Tagging': Tagging,
  'Context': PageContext
};

const ORIENTATIONS = [
  { label: 'Top', value: 'top' },
  { label: 'Left', value: 'left' },
  { label: 'Bottom', value: 'bottom' },
  { label: 'Right', value: 'right' },
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
  const [activeTab, setActiveTab] = useState(getStoredValue('tab-name', 'Tagging'));
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
    <Screen>Loading...</Screen> :
    Object.entries(TABS).map(([tabName, TabContent]) => {
      const isActive = activeTab === tabName;
      return <TabContent active={isActive} />;
    });

  return (
    <Window orientation={orientation} floating={true}>
      <Toolbar header>
        <Toolbar.Actions>
          <img src={logoImage} />
          <ButtonGroup>{tabButtons}</ButtonGroup>
          <ButtonGroup pullRight>
          {
            ORIENTATIONS.map(orient => (
              <Button
                onClick={updateOrientation(orient.value)}
                active={orient.value === orientation}
              >
                <OrientationIcon orientation={orient.value} size={12} border={2} />
              </Button>
            ))
          }
          </ButtonGroup>
        </Toolbar.Actions>
      </Toolbar>
      {tabComponents}
    </Window>
  );
};
