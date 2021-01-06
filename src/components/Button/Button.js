import { h } from 'preact';
import { Icon } from '@components/Icon';
import { ButtonStyled } from './Button.styles';

export const Button = ({ children, icon, ...props }) => {
  const renderIcon = () => {
    if (!icon) return;
    return <Icon name={icon} text={!!children} />
  };

  return (
    <ButtonStyled {...props}>
      {renderIcon()}
      {children}
    </ButtonStyled>
  );
}