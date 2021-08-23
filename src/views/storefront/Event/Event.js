import { h } from 'preact';
import { useState } from 'preact/hooks';
import copy from 'clipboard-copy';
import {
  EventWrapper,
  EventHeader,
  EventContent,
  EventFooter,
  EventAction
} from './Event.styles';

export const Event = ({ header, content, footer, light }) => {
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
    <EventWrapper>
      <EventHeader light={light}>{header}</EventHeader>
      <EventContent collapsed={isCollapsed}>{content}</EventContent>
      <EventFooter>
        <EventAction onClick={!isCopied && copyContent}>
          {isCopied ? 'Copied!' : 'Copy'}
        </EventAction>
        {footer}
        <EventAction onClick={toggleIsCollapse}>
          {isCollapsed ? 'See more' : 'See less'}
        </EventAction>
      </EventFooter>
    </EventWrapper>
  );
}

Event.Action = EventAction;