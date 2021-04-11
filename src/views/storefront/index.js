
import { h, render } from 'preact';
import { StorefrontProvider } from '@contexts/storefront';
import { GlobalTheme } from "@components";
import { Storefront } from './Storefront';
import { GlobalStorefrontStyle } from './Storefront.styles';
import theme from '../theme';

// Add configs context to popup
const StorefrontWithContext = () => (
  <GlobalTheme theme={theme} injectGlobalStyle={false}>
    <GlobalStorefrontStyle />
    <StorefrontProvider>
      <Storefront />
    </StorefrontProvider>
  </GlobalTheme>
);

render(<StorefrontWithContext />, document.getElementById('occ-debugger-ui'));