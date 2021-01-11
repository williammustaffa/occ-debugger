import styled from 'styled-components';
import { inputCss } from '../input.css';

export const RadioWrapper = styled.label`
  position: relative;
  display: block;
  margin-top: 10px;
  margin-bottom: 10px;
  padding-left: 20px;
  font-weight: normal;
`;

export const RadioStyled = styled.input.attrs(() => ({
  type: 'radio'
}))`
  ${inputCss}

  position: absolute;
  margin-left: -20px;
  margin-top: 4px;
`;