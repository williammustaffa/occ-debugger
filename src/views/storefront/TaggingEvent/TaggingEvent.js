import { h } from 'preact';
import { TaggingEventWrapper, TaggingEventHeader, TaggingEventContent } from './TaggingEvent.styles';

export const TaggingEvent = ({ title, content, light }) => {
  return (
    <TaggingEventWrapper>
      <TaggingEventHeader light={light}>{title}</TaggingEventHeader>
      <TaggingEventContent>{content}</TaggingEventContent>
    </TaggingEventWrapper>
  );
}