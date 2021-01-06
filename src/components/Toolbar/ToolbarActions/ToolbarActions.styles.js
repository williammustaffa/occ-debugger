import styled from 'styled-components';
import { ButtonStyled, ButtonGroupStyled } from '@components'

export const ToolbarActionsStyled = styled.div`
  margin-top: 4px;
  margin-bottom: 3px;
  padding-right: 3px;
  padding-left: 3px;
  padding-bottom: 3px;
  -webkit-app-region: drag;

  &:before, &:after {
    display: table;
    content: " ";
  }

  &:after {
    clear: both;
  }

  & > ${ButtonStyled},
  & > ${ButtonGroupStyled} {
    margin-left: 4px;
    margin-right: 4px;
  }
`;