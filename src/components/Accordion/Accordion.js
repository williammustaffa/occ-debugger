import { h,  } from 'preact';
import { useState } from 'preact/hooks';
import { AccordionWrapper, AccordionTitle, AccordionContent } from './Accordion.styles';
import { Icon } from '@components';

export const Accordion = ({ children, title, content, inline, enabled = true, collapsed = true }) => {
  const [isCollapsed, setIsCollapsed] = useState(collapsed);

  // Visibility toggler
  const toggleCollapsed = () => setIsCollapsed(!isCollapsed);

  return (
    <AccordionWrapper collapsed={isCollapsed}>
      <AccordionTitle onClick={enabled && toggleCollapsed} enabled={enabled} >
        {title}
        {enabled && <Icon name={isCollapsed ? 'down-open' : 'up-open' } float="right" inline={inline} />}
      </AccordionTitle>
      {
        !isCollapsed
          ? <AccordionContent>{content || children}</AccordionContent>
          : null
      }
    </AccordionWrapper>
  );
};