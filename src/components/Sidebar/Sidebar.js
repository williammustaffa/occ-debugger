import { h } from 'preact';
import { SidebarWrapper, SidebarStyled , SidebarContent, SidebarToggler } from './Sidebar.styles';

// Main component
export const Sidebar = ({ children, height, width, collapsed = true, ...props }) => (
  <SidebarWrapper height={height} width={width}>
    <SidebarStyled {...props}>{children}</SidebarStyled>
  </SidebarWrapper>
);

// Subcomponents
Sidebar.Content = SidebarContent;
Sidebar.Toggler = SidebarToggler;