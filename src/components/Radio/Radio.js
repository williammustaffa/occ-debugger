import { h } from 'preact';
import { RadioStyled, RadioWrapper } from './Radio.styles';

export const Radio = ({ children, label, ...props }) => (
  <RadioWrapper>
    <label>
      <RadioStyled {...props} />
      {label}
      {children}
    </label>
  </RadioWrapper>
)