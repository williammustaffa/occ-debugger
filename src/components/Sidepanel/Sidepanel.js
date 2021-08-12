import { h } from 'preact';
import { SidepanelWrapper, SidepanelStyled , SidepanelContent, SidepanelActions } from './Sidepanel.styles';

// Main component
export const Sidepanel = ({ children, height, width, actions, orientation, collapsed, ...props }) => (
  <SidepanelWrapper
    height={height}
    width={width}
    collapsed={collapsed}
    orientation={orientation}
  >
    <SidepanelStyled {...props}>{children}</SidepanelStyled>
    <SidepanelActions>{actions}</SidepanelActions>
  </SidepanelWrapper>
);

Sidepanel.Content = SidepanelContent;
