import styled, { css } from 'styled-components';

export const SidebarWrapper = styled.div`
  position: fixed;
  height: 100vh;
  width: ${props => props.width ? `${props.width}px`: 'auto'};
  top: 0;
  right: 0;
  z-index: 999999;
  color: ${({ theme }) => theme.global.color || '#333'};
  background-color: ${({ theme }) => theme.global.background || 'transparent'};
  box-shadow: 0 0 10px rgb(0, 0, 0, 0.1);
  transform: translateX(${props => props.collapsed ? '100%' : '0'});
  transition: transform 0.2s ease-in-out;
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
  position: relative;
  overflow-y: auto;
  display: flex;
  flex: 1;
`;

export const SidebarTogglerStyled = styled.div`
  display: block;
  height: 30px;
  width: 30px;
  position: absolute;
  right: 100%;
  top: 15px;
  box-shadow: -10px 0 10px -50x rgb(0, 0, 0, 0.1);
  background-color: ${({ theme }) => theme.toolbar.background};
  border-radius: 3px 0 0 3px;
  margin-right: 10px;
  border-radius: 50%;
  color: ${({ theme }) => theme.toolbar.color};
  transition: transform 0.2s ease-in-out;
  transform: rotate(${props => !props.collapsed ? '45deg' : '0deg' });
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  cursor: pointer;
`;