import styled from 'styled-components';
import { BaseInput } from '@base-css';

export const CheckboxWrapper = styled.div`
  position: relative;
  display: block;
  margin-top: 10px;
  margin-bottom: 10px;

 label {
   padding-left: 20px;
   margin-bottom: 0;
   font-weight: normal;
 }
`;

export const CheckboxStyled = styled.input.attrs(() => ({
  type: 'checkbox'
}))`
  ${BaseInput}

  position: absolute;
  margin-left: -20px;
  margin-top: 4px;
`;