import { h } from 'preact';
import { InputStyled, InputWrapper } from './Input.styles';

export const Input = ({ className, label, ...props }) => (
  <InputWrapper>
    {label && <label>{label}</label>}
    <InputStyled {...props} />
  </InputWrapper>
);