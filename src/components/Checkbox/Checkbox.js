import { h } from 'preact';
import { CheckboxStyled, CheckboxWrapper } from './Checkbox.styles';

export const Checkbox = ({ children, label, ...props }) => (
  <CheckboxWrapper>
    <label>
      <CheckboxStyled {...props} />
      {label}
      {children}
    </label>
  </CheckboxWrapper>
)