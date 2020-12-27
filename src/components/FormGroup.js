import { h } from 'preact';
import classNames from 'classnames';

export function FormGroup({ children, className, ...props }) {
  const componentClass = classNames('form-group', className);

  return (
    <div className={componentClass} {...props}>{children}</div>
  );
}