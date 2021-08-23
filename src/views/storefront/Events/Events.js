import { h } from 'preact';
import { useRef, useEffect, useCallback } from 'preact/hooks';
import { format } from 'date-fns';
import { identity } from 'lodash';
import { Screen } from '@components';
import { useStorefront } from '@contexts/storefront';

// Styles
import { FadeIn } from '../Storefront.styles';

// Components
import { Event } from '../Event';

const renderTaggingEvent = event => {
  const { action } = event;;
  const isPageview = action === 'pageview';

  const dataUet = event[isPageview ? 'data-page-uet' : 'data-uet'] || {};
  const dataLink = dataUet[isPageview ? 'page-type' : 'link-type'];

  const eventTitle = dataLink ?  `${action}: ${dataLink}` : `${action}`;
  const eventDate = format(Date.now(), 'dd.MM.yyyy - hh:mm:ss');

  const componentDetail = [
    dataUet.cname,
    dataUet['add-detail']
  ].filter(identity).join(' - ');

  const header = (
    <div>
      <small>{eventDate}</small>
      {componentDetail && <div>{componentDetail}</div>}
      {eventTitle && <div>{eventTitle}</div>}
    </div>
  );

  return (
    <FadeIn>
      <Event
        header={header}
        content={JSON.stringify(event, null, 2)}
        light={isPageview}
      />
    </FadeIn>
  )
};

export const Events = ({ active }) => {
  const scrollRef = useRef()

  const { events } = useStorefront();

  const scrollToBottom = useCallback(() => {
    const element = scrollRef && scrollRef.current;

    if (element) {
      element.scrollTo({ behavior: 'smooth', top: element.scrollHeight });
    }
  }, [scrollRef]);

  // Scroll when an event is added
  useEffect(scrollToBottom, [events]);

  return (
    <div>
      {
        Array.isArray(events) && events.length ?
        events.map(renderTaggingEvent) : 
        <Screen>No events triggered</Screen>
      }
    </div>
  )
};