import styled, { keyframes, css } from 'styled-components';
import { IconStyled } from '../Icon/Icon.styles';

export const AccordionTitle = styled.div`
  cursor: ${props => props.enabled ? 'pointer' : 'normal'};
  padding: 5px 10px;
  border-bottom: 1px solid #dadada;

  ${IconStyled} {
    &.down-object-position, &.up-open {
      ${props => props.inline
      ? css`
          float: none;
          margin-left: 10px;
          color: #b2b2b2;
        `
      : css`
          float: right;
        `
      }
    }
  }
`;

export const AccordionContent = styled.div`
  overflow: hidden;
  padding: 5px 10px;
  border-bottom: 1px solid #dadada;
`;

export const AccordionWrapper = styled.div`
  display: block;
`;

