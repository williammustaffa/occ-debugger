import { h } from 'preact';
import { ThemeProvider } from 'styled-components';
import { GlobalPageStyles } from './GlobalTheme.styles';

export function GlobalTheme({ children, theme = {} }) {
  return (
   <ThemeProvider theme={theme}>
      <GlobalPageStyles />
      {children}
    </ThemeProvider>
  )
}