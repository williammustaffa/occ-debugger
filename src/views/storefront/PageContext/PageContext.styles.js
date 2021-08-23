import styled from 'styled-components';
import { AccordionTitle, AccordionContent } from '@components/Accordion/Accordion.styles';

export const PageContextDataStyled = styled.div`
  padding-left: 10px;
  font-family: monospace;
`;

export const PageContextValue = styled.span`
  color: ${({ theme, color }) => color || '#222'};
`;

export const PageContextLink = styled.a`
  cursor: pointer;

  small {
    font-size: 8px;
    color: #222;
  }
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

export const PageContextWrapper = styled.div`
  position: relative;
  padding: 10px 0;
`;

export const PageContextHeading = styled.div`
  font-size: 1.25em;
  text-align: center;
  padding: 5px 10px;
  background: #f5f5f5;
  border-bottom: 1px solid #dadada;
`;

export const PageContextSidebar = styled.div`
  grid-column: 1;
  overflow: hidden;
  overflow-y: auto;
  border-right: 1px solid #dadada;
`;

export const PageContextContent = styled.div`
  position: relative;
  grid-column: 2;
  background: #f5f5f5f5;
  overflow: scroll;
  overflow-y: auto;
`;