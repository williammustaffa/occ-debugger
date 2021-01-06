import { css } from 'styled-components';
import { BaseProperties } from './BaseProperties';

export const BaseInput = css`
  ${BaseProperties}

  color: inherit;
  font: inherit;
  margin: 0;
  -webkit-user-select: text;
  -webkit-app-region: no-drag;

  &[type="number"]::-webkit-inner-spin-button,
  &[type="number"]::-webkit-outer-spin-button {
    height: auto;
  }

  &[type="search"] {
    -webkit-appearance: textfield;
    box-sizing: content-box;
  }

  &[type="search"]::-webkit-search-cancel-button,
  &[type="search"]::-webkit-search-decoration {
    -webkit-appearance: none;
  }
`;