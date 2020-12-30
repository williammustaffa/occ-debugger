
import { h, render } from 'preact';
import { ConfigsProvider } from '@contexts/configs';
import { Popup } from './Popup';

// Import photon css
import "photon/dist/css/photon.css";

// Add configs context to popup
const PopupWithConfigs = () => (
  <ConfigsProvider>
    <Popup />
  </ConfigsProvider>
);

render(<PopupWithConfigs />, document.body);