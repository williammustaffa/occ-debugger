import { h } from 'preact';
import { ToolbarActionsStyled } from './ToolbarActions.styles';

export const ToolbarActions = ({ children, ...props }) => {
  return <ToolbarActionsStyled {...props}>{children}</ToolbarActionsStyled>
}


