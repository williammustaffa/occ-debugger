import { h } from 'preact';
import { ToolbarActions } from './ToolbarActions';
import { ToolbarStyled } from './Toolbar.styles';

export const Toolbar = ({ children, ...props }) => {
  return <ToolbarStyled {...props}>{children}</ToolbarStyled>
}

Toolbar.Actions = ToolbarActions;


