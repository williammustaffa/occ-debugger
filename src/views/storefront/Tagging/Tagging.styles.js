import styled, { css, createGlobalStyle, keyframes } from 'styled-components'

export const TaggingStyled = styled.div`
  position: relative;
  padding: 0 10px 10px;
  min-height: ${props => props.height || 0}px;
  width: 100%;

  ${props => props.centered && css`
    display: flex;
    align-items: center;
    justify-content: center;
  `}
`;

export const Section = styled.div`
  margin: 0 0 10px;
`;

export const TaggingWrapper = styled.div`
  display: block;
  margin: 10px 0;
  border: 1px solid #454658;
  border-radius: 3px;
  overflow: hidden;
`;

export const TaggingEvent = styled.pre`
  margin: 0;
  border: 0;
  border-radius: 0;
  background: #454658;
  color: #f5f5f5;
`;

export const TaggingDetail = styled.pre`
  margin: 0;
  border: 0;
  border-radius: 0;
  background-color: #f5f5f5;
  color: #222222;
  font-size: 11px;
  font-family: Consolas, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New;
  padding: 5px;
`;

export const TaggingActionsStyled = styled.div`
  display: flex;
  padding: 5px 0;
`;

const highlight = keyframes`
  0% {
    outline: 5px solid rgba(100, 100, 255, 1);
    background: rgba(100, 100, 255, 0.5);
  }
  100% {
    outline: 5px solid transparent;
    background: transparent;
  }
`;

export const GlobalTaggingStyles = createGlobalStyle`
  [data-highlight-state] {
    position: relative;

    &:before {
      transition: all 2s linear;
      pointer-events: none;
      content: "";
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 999999;
      outline: 2px solid rgba(100, 100, 255, 0.5);
    }

    &:after {
      content: "";
      display: block;
      clear: both;
      visibility: hidden;
      height: 0;
      line-height: 0; 
    }

    &[data-highlight-state='reset'] {
      &:before {
        animation-delay: -99s;
        animation: none;
      }
    }

    &[data-highlight-state='active'] {
      &:before {
        animation: ${highlight} 2s linear forwards;
      }
    }
  }
`;