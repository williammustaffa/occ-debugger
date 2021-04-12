import { h } from 'preact';
import { useRef, useCallback } from 'preact/hooks';
import { Sidebar, Screen } from '@components';
import { useStorefront } from '@contexts/storefront';
import { FadeIn, TaggingEventwrapper } from '../Storefront.styles';
import { TaggingEvent } from '../TaggingEvent';
import { useEffect } from 'preact/hooks';

const renderTaggingEvent = event => {
  const { action } = event;;
  const isPageview = action === 'pageview';

  const dataUet = event[isPageview ? 'data-page-uet' : 'data-uet'] || {};
  const dataLink = dataUet[isPageview ? 'page-type' : 'link-type'];

  const eventTitle = dataLink ?  `${action}: ${dataLink}` : action;

  return (
    <FadeIn>
      <TaggingEventwrapper>
        <TaggingEvent
          header={eventTitle}
          content={JSON.stringify(event, null, 2)}
          light={isPageview}
        />
      </TaggingEventwrapper>
    </FadeIn>
  )
};

export const TaggingEvents = ({ active }) => {
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
    <Sidebar.Content hide={!active} ref={scrollRef}>
      {
        Array.isArray(events) && events.length ?
        events.map(renderTaggingEvent) : 
        <Screen>No events triggered</Screen>
      }
    </Sidebar.Content>
  )
};