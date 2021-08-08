import { h } from 'preact';
import { useRef } from 'preact/hooks';
import { toPairs, map } from 'lodash';
import { Accordion, Sidebar } from '@components';
import { useStorefront } from '@contexts/storefront';
import { PageContextData } from './PageContextData';
import { PageContextHeading } from './PageContext.styles';

export const PageContext = ({ active }) => {
  const scrollRef = useRef()

  const { user, cart, site, widgets } = useStorefront();

  const renderWidgetAccordion = ([widgetName, data]) => {
    return (
      <Accordion title={widgetName}>
        <PageContextData data={data} />
      </Accordion>
    )
  };

  return (
    <Sidebar.Content hide={!active} ref={scrollRef}>
      <PageContextHeading>Page</PageContextHeading>
      <Accordion title="Site">
        <PageContextData data={site} />
      </Accordion>
      <Accordion title="User">
        <PageContextData data={user} />
      </Accordion>
      <Accordion title="Cart">
        <PageContextData data={cart} />
      </Accordion>
      <PageContextHeading>Widgets</PageContextHeading>
      {map(toPairs(widgets), renderWidgetAccordion)}
    </Sidebar.Content>
  )
};