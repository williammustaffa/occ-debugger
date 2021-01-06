
import { h } from 'preact';
import { IconStyled } from './Icon.styles';

export const Icon = ({ children, ...props }) => (
  <IconStyled {...props}>{children}</IconStyled>
);