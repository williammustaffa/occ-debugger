import { h } from 'preact';
import { useState } from 'preact/hooks';
import copy from 'clipboard-copy';
import {
  TaggingEventWrapper,
  TaggingEventHeader,
  TaggingEventContent,
  TaggingEventFooter,
  TaggingEventAction
} from './TaggingEvent.styles';

export const TaggingEvent = ({ header, content, footer, light }) => {
  const [isCollapsed, setIsCollapsed] =  useState(true);
  const [isCopied, setIsCopied] = useState(false);

  const toggleIsCollapse = () => setIsCollapsed(!isCollapsed);
  const copyContent = () => {
    setIsCopied(true);
    copy(content);
    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };

  return (
    <TaggingEventWrapper>
      <TaggingEventHeader light={light}>{header}</TaggingEventHeader>
      <TaggingEventContent collapsed={isCollapsed}>{content}</TaggingEventContent>
      <TaggingEventFooter>
        <TaggingEventAction onClick={!isCopied && copyContent}>
          {isCopied ? 'Copied!' : 'Copy'}
        </TaggingEventAction>
        <TaggingEventAction onClick={toggleIsCollapse}>
          {isCollapsed ? 'See more' : 'See less'}
        </TaggingEventAction>
      </TaggingEventFooter>
    </TaggingEventWrapper>
  );
}

TaggingEvent.Action = TaggingEventAction;