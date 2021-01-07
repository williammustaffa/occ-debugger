
import { h, render } from 'preact';
import { ConfigsProvider } from '@contexts/configs';
import { GlobalTheme } from "@components";
import { Popup } from './Popup';
import theme from './theme';

// Add configs context to popup
const PopupWithConfigs = () => (
  <GlobalTheme theme={theme}>
    <ConfigsProvider>
      <Popup />
    </ConfigsProvider>
  </GlobalTheme>
);

render(<PopupWithConfigs />, document.body);