import { h } from 'preact';
import classNames from 'classnames';

export function Footer({ children, className, ...props }) {
  const componentClass = classNames([className, 'toolbar', ' toolbar-footer']);

  return (
    <footer className={componentClass} {...props}>{children}</footer>
  );
}