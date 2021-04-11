import { h } from 'preact';
import { TaggingEvent } from '../TaggingEvent';

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
  return (
    <TaggingEvent
      header={renderEventDetails(event)}
      content={JSON.stringify(event.detail, null, 2)}
    />
  );
}

export const TaggingRelationshipEvents = ({ events = [] }) => {
  if (!events.length) {
    return <p>This widget is not tagged!</p>;
  }

  return events.map(renderTaggingEvent);
}