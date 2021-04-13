import { h } from 'preact';
import { TaggingEventwrapper } from '../Storefront.styles';
import { TaggingEvent } from '../TaggingEvent';

const NATIVE_EVENTS = ['click', 'mouseup', 'mousedown', 'focus', 'focusout', 'blur', 'hover'];

const simulateEvent = event => () => {
  const eventName = event.trigger;
  const eventSelector = event.selector;

  $(eventSelector).trigger(eventName);
};

const renderEventDetails = event => {
  return Object.entries(event).map(([name, value]) => {
    if (name === 'detail') return null;

    return (
      <div>
        <strong>{name}:</strong> <span>{JSON.stringify(value)}</span>
      </div>
    )
  });
};

const renderTaggingEvent = event => {
  // We can't implement this right away, since it dependeds on a lot of things
  // const eventElements = event.selector && $(event.selector) || [];
  // const canSimulate = NATIVE_EVENTS.indexOf(event.trigger) > -1 && !!eventElements.length;
  // const simulateAction = canSimulate && (
  //   <TaggingEvent.Action onClick={simulateEvent(event)}>Simulate</TaggingEvent.Action>
  // );

  return (
    <TaggingEventwrapper margin="0 0 10px 0">
      <TaggingEvent
        header={renderEventDetails(event)}
        content={JSON.stringify(event.detail, null, 2)}
      />
    </TaggingEventwrapper>
  );
}

export const TaggingRelationshipEvents = ({ events = [] }) => {
  if (!events.length) {
    return <p>This widget is not tagged!</p>;
  }

  return events.map(renderTaggingEvent);
}