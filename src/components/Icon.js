
import { h } from 'preact';
import classNames from 'classnames';

export function Icon({ children, className, name, text, ...props }) {
  const componentClass = classNames('icon', {
    [`icon-${name}`]: !!name,
    'icon-text': !!(text || children)
  })

  return (
    <span {...props} className={componentClass}>{children}</span>
  );
}