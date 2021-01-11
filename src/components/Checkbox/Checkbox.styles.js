import styled from 'styled-components';
import { inputCss } from '../input.css';

export const CheckboxWrapper = styled.label`
  position: relative;
  display: block;
  margin-top: 10px;
  margin-bottom: 10px;
  padding-left: 20px;
  font-weight: normal;
`;

export const CheckboxStyled = styled.input.attrs(() => ({
  type: 'checkbox'
}))`
  ${inputCss}

  position: absolute;
  margin-left: -20px;
  margin-top: 4px;
`;