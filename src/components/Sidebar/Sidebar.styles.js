import styled, { css } from 'styled-components';

export const SidebarWrapper = styled.div`
  position: fixed;
  height: 100vh;
  width: ${props => props.width ? `${props.width}px`: 'auto'};
  top: 0;
  z-index: 999999;
  color: ${({ theme }) => theme.global.color || '#333'};
  background-color: ${({ theme }) => theme.global.background || 'transparent'};
  box-shadow: 0 0 10px rgb(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out;

  ${props => {
    switch (props.orientation) {
      case 'left':
        return css`
          left: 0;
          transform: translateX(${props => props.collapsed ? '-100%' : '0'});

          ${SidebarActions} {
            left: 100%;
          }
        `;
      default:
        return css`
          right: 0;
          transform: translateX(${props => props.collapsed ? '100%' : '0'});

          ${SidebarActions} {
            right: 100%;
          }
        `;
    }
  }}
`;

export const SidebarStyled = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: column;
`;

export const SidebarContent = styled.div`
  display: ${props => props.hide ? 'none' : 'block'};
  position: relative;
  overflow-y: auto;
  flex: 1;
`;

export const SidebarActions = styled.div`
  display: block;
  margin: 10px;
  position: absolute;
  top: 0;
`;

export const SidebarTogglerStyled = styled.div`
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