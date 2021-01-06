import styled from 'styled-components';
import { BaseInput } from '@base-css';

export const InputWrapper = styled.div`
  display: inline-block;
  width: 100%;
`;

export const InputStyled = styled.input.attrs(() => ({
  type: 'text'
}))`
  ${BaseInput}

  display: inline-block;
  width: 100%;
  min-height: 25px;
  padding: 5px 10px;
  font-size: 13px;
  line-height: 1.6;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  outline: none;

  &:focus {
    border-color: #6db3fd;
    box-shadow: 0 0 0 3px #6db3fd;
  }
`