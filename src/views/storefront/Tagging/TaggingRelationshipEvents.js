import { h } from 'preact';
import { TaggingEvent, TaggingDetail, TaggingWrapper } from './Tagging.styles';

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
    <TaggingWrapper>
      <TaggingEvent>{renderEventDetails(event)}</TaggingEvent>
      <TaggingDetail>{JSON.stringify(event.detail, null, 2)}</TaggingDetail>
    </TaggingWrapper>
  );
}

export const TaggingRelationshipEvents = ({ events = [] }) => {
  if (!events.length) {
    return <p>This widget is not tagged!</p>;
  }

  return events.map(renderTaggingEvent);
}