import { h } from 'preact';
import { SidebarWrapper, SidebarStyled , SidebarContentStyled } from './Sidebar.styles';

export const Sidebar = ({ children, height, width, ...props }) => (
  <SidebarWrapper height={height} width={width}>
    <SidebarStyled {...props}>{children}</SidebarStyled>
  </SidebarWrapper>
);

Sidebar.Content = ({ children, ...props }) => (
  <SidebarContentStyled {...props}>{children}</SidebarContentStyled>
);;