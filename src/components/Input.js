import { h, Fragment } from 'preact';
import classNames from 'classnames';

export function Input({ className, label, ...props }) {
  const inputClass = classNames('form-control', className);

  return (
    <Fragment>
      {label && <label>{label}</label>}
      <input className={inputClass} {...props} />
    </Fragment>
  );
}