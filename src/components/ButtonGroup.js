import { h } from 'preact';
import classNames from 'classnames';

export function ButtonGroup({ children, className, ...props }) {
  const componentClass = classNames([className, 'btn-group']);

  return (
    <div className={componentClass} {...props}>{children}</div>
  );
}