import { h } from 'preact';
import { WindowWrapper, WindowStyled, WindowContentStyled, WindowSidebar, WindowMain } from './Window.styles';

// Main component
export const Window = ({ children, ...props }) => (
  <WindowWrapper {...props}>
    <WindowStyled>{children}</WindowStyled>
  </WindowWrapper>
);

export const WindowContent = ({ children, visible = true, ...props }) => {
  if (!visible) return null;

  return (
    <WindowContentStyled {...props}>
      {children}
    </WindowContentStyled>
  );
}

// Subcomponents
Window.Content = WindowContent;
Window.Sidebar = WindowSidebar;
Window.Main = WindowMain;