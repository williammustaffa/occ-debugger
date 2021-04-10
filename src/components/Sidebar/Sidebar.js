import { h } from 'preact';
import { Icon } from '@components';
import { SidebarWrapper, SidebarStyled , SidebarContent, SidebarTogglerStyled } from './Sidebar.styles';

// Main component
export const Sidebar = ({ children, height, width, collapsed = true, ...props }) => (
  <SidebarWrapper height={height} width={width} collapsed={collapsed}>
    <SidebarStyled {...props}>{children}</SidebarStyled>
  </SidebarWrapper>
);

Sidebar.Toggler = props => {
  return (
    <SidebarTogglerStyled {...props}>
      <Icon name="plus"/>
    </SidebarTogglerStyled>
  )
};

Sidebar.Content = SidebarContent;
