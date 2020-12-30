import { h } from 'preact';
import styled from 'styled-components';
import classNames from 'classnames';
import { Icon } from './Icon';

const ButtonStyled = styled.button`
  display: ${props => props.hidden ? 'none' : 'block' };
  opacity: ${props => props.disabled ? 0.5 : 1};
  cursor: pointer;
`;

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
  pullRight,
  pullLeft,
  icon,
  disabled,
  active,
  hide,
  ...props
}) {
  const componentClass = classNames('btn', className, {
    'active': active,
    'btn-default': ![primary, positive, negative, warning].some(isEnabled => !!isEnabled),
    'btn-primary': primary,
    'btn-positive': positive,
    'btn-negative': negative,
    'btn-warning': warning,
    'btn-large': large,
    'btn-mini': mini,
    'btn-form': form,
    'pull-right': pullRight,
    'pull-left': pullLeft
  });

  const renderIcon = () => {
    if (!icon) return;
    return <Icon name={icon} text={!!children} />
  };

  return (
    <ButtonStyled className={componentClass} disabled={disabled} {...props}>
      {renderIcon()}
      {children}
    </ButtonStyled>
  );
}