import styled, { css } from 'styled-components';
import { TitleStyled } from '@components/Title'

export const ToolbarStyled = styled.div`
  min-height: 22px;
  box-shadow: inset 0 1px 0 #f5f4f5;
  padding: 5px 0 3px;
  background-color: ${({ theme }) => theme.toolbar.background};
  background-image: ${({ theme }) => theme.flat ? 'none' : css`linear-gradient(to bottom, ${theme.toolbar.background} 0%, ${theme.toolbar.gradient} 100%);`};

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
`