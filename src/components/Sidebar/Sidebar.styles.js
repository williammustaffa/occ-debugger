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
  transition: all 0.5s ease-in-out;
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

export const SidebarToggler = styled.div`
  display: block;
  height: 30px;
  width: 30px;
  position: absolute;
  right: 100%;
`;