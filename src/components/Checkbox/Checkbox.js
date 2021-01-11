import { h } from 'preact';
import { CheckboxStyled, CheckboxWrapper } from './Checkbox.styles';

export const Checkbox = ({ children, label, onChange, ...props }) => {
  const handleChange = (e) => {
    const value = e.target.checked;
    if (typeof onChange === 'function') {
      onChange(value);
    }
  }

  return (
    <CheckboxWrapper>
      <CheckboxStyled {...props} onChange={handleChange}/>
      {label}
      {children}
    </CheckboxWrapper>
  )
}