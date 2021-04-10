
import { h, render } from 'preact';
import { ConfigsProvider } from '@contexts/configs';
import { GlobalTheme } from "@components";
import { Popup } from './Popup';
import theme from '../theme';

// Add configs context to popup
const PopupWithContext = () => (
  <GlobalTheme theme={theme}>
    <ConfigsProvider>
      <Popup />
    </ConfigsProvider>
  </GlobalTheme>
);

render(<PopupWithContext />, document.body);