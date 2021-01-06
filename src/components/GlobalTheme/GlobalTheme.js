import { h, Fragment } from 'preact';
import { get, isFunction } from 'lodash';
import { ThemeProvider } from 'styled-components';
import { GlobalPageStyles } from './GlobalTheme.styles';

export const getProps = (path, callback) => props => {
  const value = get(props.theme, path);
  return isFunction(callback) ? callback(value) : value;
}

export function GlobalTheme({ children, theme = {} }) {
  return (
   <ThemeProvider theme={theme}>
      <GlobalPageStyles />
      {children}
    </ThemeProvider>
  )
}