import { h } from 'preact';
import { WindowWrapper, WindowStyled , WindowContentStyled } from './Window.styles';

export const Window = ({ children, height, width, ...props }) => (
  <WindowWrapper height={height} width={width}>
    <WindowStyled {...props}>{children}</WindowStyled>
  </WindowWrapper>
);

Window.Content = ({ children, ...props }) => (
  <WindowContentStyled {...props}>{children}</WindowContentStyled>
);;