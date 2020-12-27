import { h } from 'preact';
import classNames from 'classnames';

export function Title({ children, className, ...props }) {
  const componentClass = classNames([className, 'title']);

  return (
    <h1 className={componentClass} {...props}>{children}</h1>
  );
}