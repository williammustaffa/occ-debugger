import styled, { css } from 'styled-components';

export const SidepanelWrapper = styled.div`
  position: fixed;
  z-index: 999999;
  color: ${({ theme }) => theme.global.color || '#333'};
  background-color: ${({ theme }) => theme.global.background || 'transparent'};
  box-shadow: 0 0 10px rgb(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out;

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
      default:
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

export const SidepanelStyled = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: column;
`;

export const SidepanelContent = styled.div`
  display: ${props => props.hide ? 'none' : 'block'};
  position: relative;
  overflow-y: auto;
  flex: 1;
`;

export const SidepanelActions = styled.div`
  display: block;
  margin: 10px;
  position: absolute;
  top: 0;
`;

export const SidepanelTogglerStyled = styled.div`
  display: ${props => props.hide ? 'none' : 'flex'};
  height: 30px;
  width: 30px;
  box-shadow: -10px 0 10px -50x rgb(0, 0, 0, 0.1);
  background-color: ${({ theme }) => theme.toolbar.background};
  border-radius: 3px 0 0 3px;
  border-radius: 50%;
  color: ${({ theme }) => theme.toolbar.color};
  transition: transform 0.2s ease-in-out;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  cursor: pointer;
  margin-bottom: 10px;

  ${props => props.rotate && css`
    transform: rotate(${props.rotate}deg);
  `}
`;