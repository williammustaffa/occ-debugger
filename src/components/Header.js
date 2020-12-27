import { h } from 'preact';
import classNames from 'classnames';

export function Header({ children, className, ...props }) {
  const componentClass = classNames([className, 'toolbar', ' toolbar-header']);

  return (
    <header className={componentClass} {...props}>{children}</header>
  );
}