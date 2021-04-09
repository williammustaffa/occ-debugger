import { h } from 'preact';
import { WindowWrapper, WindowStyled , WindowContent } from './Window.styles';

// Main component
export const Window = ({ children, height, width, ...props }) => (
  <WindowWrapper height={height} width={width}>
    <WindowStyled {...props}>{children}</WindowStyled>
  </WindowWrapper>
);

// Subcomponents
Window.Content = WindowContent;