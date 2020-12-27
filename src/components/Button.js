import { h } from 'preact';
import classNames from 'classnames';
import { Icon } from './Icon';

export function Button({
  children,
  className,
  primary,
  positive,
  negative,
  warning,
  large,
  mini,
  form,
  icon,
  ...props
}) {
  const componentClass = classNames('btn', className, {
    'btn-default': ![primary, positive, negative, warning].some(isEnabled => !!isEnabled),
    'btn-primary': primary,
    'btn-positive': positive,
    'btn-negative': negative,
    'btn-warning': warning,
    'btn-large': large,
    'btn-mini': mini,
    'btn-form': form
  });

  const renderIcon = () => {
    if (!icon) return;
    return <Icon name={icon} text={!!children} />
  };

  return (
    <button className={componentClass} {...props}>
      {renderIcon()}
      {children}
    </button>
  );
}