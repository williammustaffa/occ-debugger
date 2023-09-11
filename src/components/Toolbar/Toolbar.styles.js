import styled, { css } from 'styled-components';
import { TitleStyled } from '@components/Title/Title.styles';
import { ButtonStyled } from '@components/Button/Button.styles';
import { ButtonGroupStyled } from '@components/ButtonGroup/ButtonGroup.styles';

export const ToolbarStyled = styled.div`
  min-height: 22px;
  box-shadow: inset 0 1px 0 #f5f4f5;
  padding: 5px 0 3px;
  background-color: ${({ theme }) => theme.toolbar.background};
  background-image: ${({ theme }) => theme.flat ? 'none' : css`linear-gradient(to bottom, ${theme.toolbar.background} 0%, ${theme.toolbar.gradient} 100%);`};
  -webkit-user-select: none;
  box-shadow: 0 0 10px -5px rgba(0, 0, 0, 0.1);

  &:before, &:after {
    display: table;
    content: " ";
  }

  &:after {
    clear: both;
  }

  ${TitleStyled} {
    color: ${({ theme }) => theme.toolbar.color};
  }

  ${props => props.header && css`
    border-bottom: 1px solid ${props.theme.toolbar.border};

    ${TitleStyled} {
      margin-top: 1px;
    }
  `}

  ${props => props.footer && css`
    border-top: 1px solid ${props.theme.toolbar.border};
    -webkit-app-region: drag;
  `}

  ${props => (props.borderless || props.theme.flat) && css`
    border-top: 0;
    border-bottom: 0;
    box-shadow: none;
  `}
`;

export const ToolbarActions = styled.div`
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

  ${props => props.centered && css`
    text-align: center;
  `}
`;