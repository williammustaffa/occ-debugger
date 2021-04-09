import { h } from 'preact';
import { ThemeProvider } from 'styled-components';
import { GlobalPageStyles } from './GlobalTheme.styles';

export function GlobalTheme({ children, injectGlobalStyle = true, theme = {} }) {
  return (
   <ThemeProvider theme={theme}>
      {injectGlobalStyle && <GlobalPageStyles />}
      {children}
    </ThemeProvider>
  )
}