import { h } from 'preact';
import { Icon } from '@components';
import { SidebarWrapper, SidebarStyled , SidebarContent, SidebarTogglerStyled, SidebarActions } from './Sidebar.styles';

// Main component
export const Sidebar = ({ children, height, width, actions, orientation = 'right', collapsed = true, ...props }) => (
  <SidebarWrapper
    height={height}
    width={width}
    collapsed={collapsed}
    orientation={orientation}
  >
    <SidebarStyled {...props}>{children}</SidebarStyled>
    <SidebarActions>{actions}</SidebarActions>
  </SidebarWrapper>
);

Sidebar.Toggler = ({ icon, ...props }) => {
  return (
    <SidebarTogglerStyled {...props}>
      <Icon name={icon}/>
    </SidebarTogglerStyled>
  )
};

Sidebar.Content = SidebarContent;
