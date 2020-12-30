import styled, { css } from 'styled-components'

export const ContentStyled = styled.div`
  position: relative;
  padding: 10px;
  min-height: ${props => props.height || 0}px;

  ${props => props.centered && css`
    display: flex;
    align-items: center;
    justify-content: center;
  `}
`;

export const Section = styled.div`
  margin: 0 0 10px;
`;
