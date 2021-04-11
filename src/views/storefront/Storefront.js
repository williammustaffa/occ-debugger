import { h } from 'preact';
import { useRef, useState, useCallback } from 'preact/hooks';
import { Sidebar, Toolbar, Title, Button, ButtonGroup } from '@components';

// Subcomponents
import { TaggingWidgets } from './TaggingWidgets';
import { TaggingEvents } from './TaggingEvents';

const tabs = {
  'Tagging Widgets': TaggingWidgets,
  'Tagging Events': TaggingEvents
};

export function Storefront() {
  const contentRef = useRef(null);
  
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('Tagging Widgets');

  const toggleCollapse = () => setIsCollapsed(!isCollapsed);
  const updateTab = tabIndex => () => setActiveTab(tabIndex);

  const scrollToBottom = () => {
    if (!contentRef || !contentRef.current) {
      return;
    }

    const element = contentRef.current;
    element.scrollTo({ behavior: 'smooth', top: element.scrollHeight });
  };

  const buttons = Object.keys(tabs).map(key => (
    <Button secondary onClick={updateTab(key)} active={activeTab === key}>{key}</Button>
  ));
  
  const TabContent = tabs[activeTab];
    
  return (
    <Sidebar modal={true} width={350} collapsed={isCollapsed}>
      <Toolbar header>
        <Title>OCC Debugger - UI</Title>
        <Toolbar.Actions centered>
          <ButtonGroup>{buttons}</ButtonGroup>
        </Toolbar.Actions>
      </Toolbar>
      <Sidebar.Content ref={contentRef}>
        <TabContent scrollToBottom={scrollToBottom} />
      </Sidebar.Content>
      <Sidebar.Toggler onClick={toggleCollapse} collapsed={isCollapsed}/>
    </Sidebar>
  );
};
