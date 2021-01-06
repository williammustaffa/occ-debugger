import styled from 'styled-components';
import { ButtonStyled } from '@components/Button';

export const ButtonGroupStyled = styled.div`
  position: relative;
  display: inline-block;
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

  /* ${ButtonStyled} + ${ButtonStyled} {
    border-left: 1px solid #c2c0c2;
  } */

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