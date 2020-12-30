import { h } from 'preact';
import classNames from 'classnames';
import styled from 'styled-components';

export const Toolbar = styled.div`
  width: ${({ width }) => width ? `${width}px` : '350px'};
  height: ${({ height }) => height ? `${height}px` : 'auto'};
`;

Toolbar.Header = function ({ children, className, ...props }) {
  const componentClass = classNames([className, 'toolbar', ' toolbar-header']);

  return (
    <header className={componentClass} {...props}>{children}</header>
  );
}

Toolbar.Body = function ({ children, className, ...props }) {
  const componentClass = classNames([className, 'toolbar', ' toolbar-body']);

  return (
    <header className={componentClass} {...props}>{children}</header>
  );
}

Toolbar.Footer = function ({ children, className, ...props }) {
  const componentClass = classNames([className, 'toolbar', ' toolbar-footer']);

  return (
    <footer className={componentClass} {...props}>{children}</footer>
  );
}

Toolbar.Actions = function ({ children, className, ...props }) {
  const componentClass = classNames([className, 'toolbar-actions'])
  return (
    <div className={componentClass}>{children}</div>
  );
}