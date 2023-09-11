import styled from 'styled-components';

export const AccordionTitle = styled.div`
  cursor: ${props => props.enabled ? 'pointer' : 'normal'};
  background: #fff;
  padding: 5px 10px;
  border-bottom: 1px solid #dadada;
`;

export const AccordionContent = styled.div`
  overflow: hidden;
  padding: 5px 10px;
  border-bottom: 1px solid #dadada;
`;

export const AccordionWrapper = styled.div`
  display: block;
`;

