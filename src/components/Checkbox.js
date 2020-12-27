import { h } from 'preact';
import classNames from 'classnames';

export function Checkbox({ children, className, label, ...props }) {
  const componentClass = classNames('checkbox', className);

  return (
    <div className={componentClass}>
      <label>
        <input type="checkbox" {...props} />
        {label}
        {children}
      </label>
    </div>
  );
}