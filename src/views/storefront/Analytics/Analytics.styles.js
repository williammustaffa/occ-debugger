import styled, { css } from 'styled-components'

export const ContentStyled = styled.div`
  position: relative;
  padding: 10px;
  min-height: ${props => props.height || 0}px;
  width:100%;

  ${props => props.centered && css`
    display: flex;
    align-items: center;
    justify-content: center;
  `}
`;

export const Section = styled.div`
  margin: 0 0 10px;
`;

export const TaggingEvent = styled.pre`
  border-radius: 3px;
  background-color: #f5f5f5;
  color: #222222;
  font-size: 11px;
  font-family: Consolas, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New;
  margin: 0 0 10px;
  padding: 5px;
`