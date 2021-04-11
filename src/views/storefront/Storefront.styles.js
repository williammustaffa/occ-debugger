import styled, { createGlobalStyle, keyframes } from 'styled-components';

export const StorefrontWrapper = styled.div`
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

const highlight = keyframes`
  0% {
    background: rgba(100, 100, 255, 0.5);
  }
  100% {
    background: transparent;
  }
`;

const fadein = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

export const FadeIn = styled.div`
  animation: ${fadein} .5s linear forwards;
`;

export const TabWrapper = styled.div`
  display: ${props => props.active ? 'block' : 'none'};
`;

export const GlobalStorefrontStyle = createGlobalStyle`
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
      min-height: 10px;
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