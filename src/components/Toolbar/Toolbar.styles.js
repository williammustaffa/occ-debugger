import styled, { css } from 'styled-components';
import { TitleStyled } from '@components/Title'
import { getProps } from '@components/GlobalTheme';

export const ToolbarStyled = styled.div`
  min-height: 22px;
  box-shadow: inset 0 1px 0 #f5f4f5;
  background-color: ${getProps('toolbar.background')};
  padding: 5px 0 3px;
  background-image: ${getProps('flat', flat => (
    flat ?
    'none' :
    css`linear-gradient(to bottom, ${getProps('toolbar.background')} 0%, ${getProps('toolbar.gradient')} 100%);`
  ))};

  &:before, &:after {
    display: table;
    content: " ";
  }

  &:after {
    clear: both;
  }

  ${TitleStyled} {
    color: ${getProps('toolbar.color')};
  }

  ${props => props.header && css`
    border-bottom: ${getProps('toolbar.border', border => border ? `1px solid ${border}` : 'none')};

    ${TitleStyled} {
      margin-top: 1px;
    }
  `}

  ${props => props.footer && css`
    border-top: ${getProps('toolbar.border', border => border ? `1px solid ${border}` : 'none')};
    -webkit-app-region: drag;
  `}

  ${props => props.borderless && css`
    border-top: 0;
    border-bottom: 0;
  `}
`