import { h } from 'preact';
import { Screen } from '@components';
import { useStorefront } from '@contexts/storefront';
import { StorefrontWrapper, FadeIn } from '../Storefront.styles';
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
      <TaggingEvent
        header={eventTitle}
        content={JSON.stringify(event, null, 2)}
        light={isPageview}
      />
    </FadeIn>
  )
};

export const TaggingEvents = ({ active, scrollToBottom }) => {
  const { events } = useStorefront();

  if (!events || !events.length) {
    return (
      <Screen>No events triggered</Screen>
    )
  };

  // Scroll when an event is added
  useEffect(() => {
    if (active) {
      scrollToBottom()
    }
  }, [events, active]);

  return (
    <StorefrontWrapper>
      {events.map(renderTaggingEvent)}
    </StorefrontWrapper>
  )
};