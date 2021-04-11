import { h } from 'preact';
import { useRef, useState } from 'preact/hooks';
import { Sidebar, Toolbar, Title, Button, ButtonGroup } from '@components';

// Subcomponents
import { TaggingWidgets } from './TaggingWidgets';
import { TaggingEvents } from './TaggingEvents';
import { TabWrapper } from './Storefront.styles';

const tabs = {
  'Tagging Widgets': TaggingWidgets,
  'Tagging Events': TaggingEvents
};

export function Storefront() {
  const contentRef = useRef(null);
  
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('Tagging Widgets');
  const [orientation, setOrientation] = useState('right');

  const toggleCollapse = () => setIsCollapsed(!isCollapsed);
  const toggleOrientation = () => setOrientation(orientation === 'right' ? 'left' : 'right');
  const updateTab = tabName => () => setActiveTab(tabName);

  const scrollToBottom = () => {
    if (!contentRef || !contentRef.current || activeTab !== 'Tagging Events') {
      return;
    }

    const element = contentRef.current;
    element.scrollTo({ behavior: 'smooth', top: element.scrollHeight });
  };

  const tabButtons = Object.keys(tabs).map(key => (
    <Button secondary onClick={updateTab(key)} active={activeTab === key}>{key}</Button>
  ));

  const tabComponents = Object.entries(tabs).map(([tabName, TabContent]) => {
    const isActive = activeTab === tabName;
    return (
      <TabWrapper active={isActive}>
        <TabContent scrollToBottom={scrollToBottom} active={isActive}/>
      </TabWrapper>
    );
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
      <Sidebar.Content ref={contentRef}>
        {tabComponents}
      </Sidebar.Content>
    </Sidebar>
  );
};
