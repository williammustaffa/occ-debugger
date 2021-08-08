import styled from 'styled-components';
import { AccordionTitle, AccordionContent } from '@components/Accordion/Accordion.styles';

export const PageContextDataStyled = styled.div`
  padding-left: 10px;
  font-family: monospace;
`;

export const PageContextValue = styled.span`
  color: ${({ theme, color }) => color || theme.negative.background};
`;

export const PageContextLink = styled.a`
  cursor: pointer;
`;

export const PageContextResultStyled = styled.div`
  display: block;
  white-space: nowrap;

  ${AccordionTitle} {
    padding: 0;
  }

  ${AccordionContent} {
    padding-right: 0;
  }

  ${AccordionTitle}, ${AccordionContent} {
    border-bottom: none;
  }
`;

export const PageContextHeading = styled.div`
  font-size: 1.25em;
  text-align: center;
  padding: 5px 10px;
  background: #f5f5f5;
  border-bottom: 1px solid #dadada;

  &:not(:first-of-type) {
    border-top: 1px solid #dadada;
  }
`;