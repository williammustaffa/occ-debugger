import { h } from 'preact';
import { InputStyled, InputWrapper } from './Input.styles';

export const Input = ({ className, label, onChange, ...props }) => {
  const handleChange = (e) => {
    const value = e.target.value;
    if (typeof onChange === 'function') {
      onChange(value);
    }
  }

  return (
    <InputWrapper>
      {label && <label>{label}</label>}
      <InputStyled {...props} onChange={handleChange}/>
    </InputWrapper>
  )
};