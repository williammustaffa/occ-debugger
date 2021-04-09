import styled, { keyframes, css } from 'styled-components';

// Create the keyframes
const open = keyframes`
  0% { height: 100%; }
  100% { height: 0; }
`;

const close = keyframes`
  0% { height: 100%; }
  100% { height: 0; }
`;

export const AccordionTitle = styled.div`
  cursor: pointer;
  background: #f5f5f5;
  padding: 5px 10px;
  border-bottom: 1px solid #dadada;
`;

export const AccordionContent = styled.div`
  overflow: hidden;
  padding: 5px 10px;
`;

export const AccordionWrapper = styled.div`
  display: block;
  margin: 0 -10px;

  &:first-of-type {
    border-top: 1px solid #dadada;
  }
`;

