import { h } from 'preact';

export function Form({ children, ...props }) {
  return (
    <form {...props}>{children}</form>
  );
}