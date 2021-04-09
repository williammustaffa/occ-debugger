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

export const SidebarContentStyled = styled.div`
  position: relative;
  overflow-y: auto;
  display: flex;
  flex: 1;
`;