import { h } from 'preact';
import { RadioStyled, RadioWrapper } from './Radio.styles';

export const Radio = ({ children, label, onChange, ...props }) => {
  const handleChange = (e) => {
    const value = e.target.checked;
    if (typeof onChange === 'function') {
      onChange(value);
    }
  }

  return (
    <RadioWrapper>
      <label>
        <RadioStyled {...props} onChange={handleChange} />
        {label}
        {children}
      </label>
    </RadioWrapper>
  )
}