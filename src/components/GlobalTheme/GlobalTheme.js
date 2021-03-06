import { h } from 'preact';
import { ThemeProvider } from 'styled-components';
import { GlobalPageStyles, GlobalThemeStyled } from './GlobalTheme.styles';

export function GlobalTheme({ children, injectGlobalStyle, theme = {} }) {
  return (
   <ThemeProvider theme={theme}>
     <GlobalThemeStyled>
        {injectGlobalStyle && <GlobalPageStyles />}
        {children}
      </GlobalThemeStyled>
    </ThemeProvider>
  )
}