import styled, { css } from 'styled-components';
import { ButtonStyled } from '@components/Button';
import { propertiesCss } from '../properties.css';

export const ButtonGroupStyled = styled.div`
  ${propertiesCss}

  position: relative;
  display: inline-flex;
  vertical-align: middle;
  -webkit-app-region: no-drag;

  ${ButtonStyled} {
    position: relative;
    float: left;

    &:focus,
    &:active {
      z-index: 2;
    }

    &.active {
      z-index: 3;
    }
  }

  ${ButtonStyled} + ${ButtonStyled},
  ${ButtonStyled} + ${ButtonGroupStyled},
  ${ButtonGroupStyled} + ${ButtonStyled},
  ${ButtonGroupStyled} + ${ButtonGroupStyled} {
    margin-left: -1px;
  }

  ${ButtonStyled} + ${ButtonStyled} {
    margin-left: 1px;
  }

  & > ${ButtonStyled} {
    &:first-child {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }

    &:last-child {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }

    &:not(:first-child) {
      border-left: 0;
    }

    &:not(:first-child):not(:last-child) {
      border-radius: 0;
    }
  }
`