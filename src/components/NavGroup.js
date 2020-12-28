import { h } from 'preact';
import classNames from 'classnames';

export function NavGroup({ children, className, ...props }) {
  const componentClass = classNames([className, 'nav-group']);

  return (
    <nav className={componentClass} {...props}>{children}</nav>
  );
}

NavGroup.Title = function ({ children, className, ...props }) {
  const componentClass = classNames([className, 'nav-group-title']);

  return (
    <h5 className={componentClass} {...props}>{children}</h5>
  )
}

NavGroup.Item = function ({ children, className, active, ...props }) {
  const componentClass = classNames([className, 'nav-group-item', {
    'active': active
  }]);

  return (
    <span className={componentClass} {...props}>{children}</span>
  )
}