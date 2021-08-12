import { h } from 'preact';
import { useRef, useState } from 'preact/hooks';
import { toPairs, map } from 'lodash';
import { Button, Sidepanel, Screen } from '@components';
import { useStorefront } from '@contexts/storefront';
import { PageContextData } from './PageContextData';
import { PageContextGrid, PageContextHeading, PageContextSidebar, PageContextContent } from './PageContext.styles';

export const PageContext = ({ active }) => {
  const scrollRef = useRef()

  const [context, setContext] = useState(-1);
  const { user, cart, site, widgets } = useStorefront();

  const selectContext = ctx => () => setContext(ctx)

  const renderWidgetAccordion = ([widgetName, widgetData]) => {
    return (
      <Button
        sidebar
        selected={context === widgetData}
        onClick={selectContext(widgetData)}
      >{widgetName}</Button>
    )
  };

  return (
    <Sidepanel.Content hide={!active} ref={scrollRef}>
      <PageContextGrid>

        <PageContextSidebar>
          <PageContextHeading>Page</PageContextHeading>
          <Button sidebar selected={context === site} onClick={selectContext(site)}>Site</Button>
          <Button sidebar selected={context === user} onClick={selectContext(user)}>User</Button>
          <Button sidebar selected={context === cart} onClick={selectContext(cart)}>Cart</Button>
          <PageContextHeading>Widgets</PageContextHeading>
          {map(toPairs(widgets), renderWidgetAccordion)}
        </PageContextSidebar>

        <PageContextContent>
          {
            context ?
              <PageContextData data={context} /> :
              <Screen>Select a context</Screen>
          }
        </PageContextContent>
  
      </PageContextGrid>
    </Sidepanel.Content>
  )
};