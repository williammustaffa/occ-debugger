import { h } from 'preact';
import { TitleStyled } from './Title.styles';

export const Title = ({ children, ...props }) => (
  <TitleStyled {...props}>{children}</TitleStyled>
);