
import { h, render } from 'preact';
import { StorefrontProvider } from '@contexts/storefront';
import { GlobalTheme } from "@components";
import { Storefront } from './Storefront';
import { GlobalStorefrontStyle } from './Storefront.styles';
import { Rnd } from "react-rnd";
import theme from '../theme';

// Add configs context to popup
const StorefrontWithContext = () => {
  const initialValue = {
    x: 0,
    y: 0,
    width: 300,
    height: window.innerHeight,
  };

  return (
    <Rnd
      default={initialValue}
      minWidth={300}
      minHeight={190}
      bounds="parent"
    >
      <GlobalTheme theme={theme} injectGlobalStyle={false}>
        <GlobalStorefrontStyle />
        <StorefrontProvider>
          <Storefront />
        </StorefrontProvider>
      </GlobalTheme>
    </Rnd>
  );
}

render(<StorefrontWithContext />, document.getElementById('occ-debugger-ui'));