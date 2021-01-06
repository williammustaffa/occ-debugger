import { h } from 'preact';
import { ButtonGroupStyled } from './ButtonGroup.styles';

export const ButtonGroup = ({ children, ...props }) => (
  <ButtonGroupStyled {...props}>{children}</ButtonGroupStyled>
);