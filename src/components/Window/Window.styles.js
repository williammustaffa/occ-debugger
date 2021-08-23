import styled, { css } from 'styled-components';

export const WindowWrapper = styled.div`
  z-index: 2147483648;
  background: ${props => props.theme.global.background};
  position: ${props => props.floating ? 'fixed' : 'relative'};
  height: ${props => props.height ? `${props.height}px`: 'auto'};
  width: ${props => props.width ? `${props.width}px`: 'auto'};

  *::-webkit-scrollbar {
    width: 16px;
  }

  *::-webkit-scrollbar-track {
    background-color: #e4e4e4;
    border-radius: 0;
  }

  *::-webkit-scrollbar-thumb {
    background-color: #323639;
    border-radius: 0;
  }

  ${props => {
    switch (props.orientation) {
      case 'left':
        return css`
          top: 0;
          left: 0;
          height: 100vh;
          width: 300px;
          transform: translateX(${props => props.collapsed ? '-100%' : '0'});
        `;
      case 'right':
        return css`
          top: 0;
          right: 0;
          height: 100vh;
          width: 300px;
          transform: translateX(${props => props.collapsed ? '100%' : '0'});
        `;
      case 'top':
        return css`
          top: 0;
          left: 0;
          height: 300px;
          width: 100%;
          transform: translateY(${props => props.collapsed ? '-100%' : '0'});
        `;
      case 'bottom':
        return css`
          bottom: 0;
          left: 0;
          height: 300px;
          width: 100%;
          transform: translateY(${props => props.collapsed ? '100%' : '0'});
        `;
    }
  }}
`;

export const WindowStyled = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: column;
`;

export const WindowContentStyled = styled.div`
  position: relative;
  overflow-y: auto;
  flex: 1;

  ${props => {
    return props.layout && css`
      display: flex;
      flex-direction: row;
    `;
  }}

`;

export const WindowSidebar = styled.div`
  flex-shrink: 0;
  flex-grow: 0;
  width: 300px;
  overflow: hidden;
  overflow-y: auto;
  border-right: 1px solid #dadada;
  border-left: 1px solid #dadada;

  &:first-of-type {
    border-left: 0;
  }

  &:last-of-type {
    border-right: 0;
  }
`;

export const WindowMain = styled.div`
  position: relative;
  background: #f5f5f5f5;
  overflow: hidden;
  overflow-y: auto;
  flex-grow: 1;
  flex-shrink: 1;
`;