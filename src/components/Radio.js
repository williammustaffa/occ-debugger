import { h } from 'preact';
import classNames from 'classnames';

export function Radio({ children, className, label, ...props }) {
  const componentClass = classNames('radio', className);

  return (
    <div className={componentClass}>
      <label>
        <input type="radio" {...props} />
        {label}
        {children}
      </label>
    </div>
  );
}