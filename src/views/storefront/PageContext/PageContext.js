import { h } from 'preact';
import { useRef, useState } from 'preact/hooks';
import { toPairs, map } from 'lodash';
import { Button, Window, Screen } from '@components';
import { useStorefront } from '@contexts/storefront';
import { PageContextData } from './PageContextData';
import { PageContextHeading, PageContextWrapper } from './PageContext.styles';

export const PageContext = ({ active }) => {
  const scrollRef = useRef()

  const [context, setContext] = useState({});
  const { user, cart, site, widgets } = useStorefront();

  const selectContext = ctx => () => setContext(ctx)

  const renderWidgetAccordion = ([widgetName, widgetData]) => {
    const contextOption = {
      name: widgetName,
      data: widgetData
    };

    return (
      <Button
        sidebar
        active={context.name === widgetName}
        onClick={selectContext(contextOption)}
      >{widgetName}</Button>
    )
  };

  return (
    <Window.Content visible={active} ref={scrollRef} layout={true}>
      <Window.Sidebar>
        <PageContextHeading>Page</PageContextHeading>
        <Button sidebar active={context.name === 'site'} onClick={selectContext({ name: 'site', data: site })}>Site</Button>
        <Button sidebar active={context.name === 'user'} onClick={selectContext({ name: 'user', data: user })}>User</Button>
        <Button sidebar active={context.name === 'cart'} onClick={selectContext({ name: 'cart', data: cart })}>Cart</Button>
        <PageContextHeading>Widgets</PageContextHeading>
        {map(toPairs(widgets), renderWidgetAccordion)}
      </Window.Sidebar>

      <Window.Main>
        {
          context?.data
            ? <PageContextWrapper>
                <PageContextData data={context.data} />
              </PageContextWrapper>
            : <Screen>Select a context</Screen>
        }
      </Window.Main>
    </Window.Content>
  )
};