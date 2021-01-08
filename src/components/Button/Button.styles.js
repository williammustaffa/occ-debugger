import styled, { css } from 'styled-components';
import { IconStyled } from '@components/Icon/Icon.styles'
import { getProps } from '@components/GlobalTheme';
import iconMap from '@assets/fonts/icon-map.json';
import { inputCss } from '../input.css';

export const ButtonStyled = styled.button`
  // Apply global properties
  ${inputCss}

  // Specific styles
  margin-bottom: 0;
  line-height: 1.4;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  cursor: default;
  background-image: none;
  border: 1px solid transparent;
  -webkit-app-region: no-drag;

  &:focus {
    outline: none;
    box-shadow: none;
  }

  // Icon inside button styles
  ${IconStyled} {
    float: left;
    width: 14px;
    height: 14px;
    margin-top: 1px;
    margin-bottom: 1px;
    color: #737475;
    font-size: 14px;
    line-height: 1;
  }

  // Non-theme variants
  display: ${props => props.hidden ? 'none' : 'inline-block' };
  opacity: ${props => props.disabled ? 0.5 : 1};

  // Theme variants
  font-size: ${getProps('typography.fontSize')};
  border-radius: ${getProps('flat', flat => !flat ? '4px' : '0')};

  // Button size
  padding: ${props => {
    if (props.mini) return '2px 6px';
    if (props.large) return '6px 12px';
    return '3px 8px';
  }};

  // Dropdown
  ${props => {
    return props.dropdown && css`
      &:after {
        font-family: "photon-entypo";
        margin-left: 5px;
        content: '\\${iconMap['down-open']}';
      }
    `
  }}

  // Button type
  ${props => {
    // In order of priority
    const type = ['primary', 'secondary', 'positive', 'negative', 'warning'].find(key => !!props[key]) || 'secondary';
    const getProp = path => getProps(`${type}.${path}`);

    return css`
      color: ${getProp('color')};
      text-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
      border-color: ${getProp('border')};
      border-bottom-color: ${getProp('borderBottom')};
      background-color: ${getProp('background')};

      &:active {
        background-color: ${getProp('active.background')};
      }

      ${getProps('flat', flat => {
        return !flat && css`
          background-image: linear-gradient(to bottom, ${getProp('background')} 0%, ${getProp('gradient')} 100%);
          &:active {
            background-image: linear-gradient(to bottom, ${getProp('active.background')} 0%, ${getProp('active.gradient')} 100%);
          }
        `
      })}
    `;
  }}

  /* Other components interaction */
  // Button form
  ${props => {
    return props.form && css`
      padding-right: 20px;
      padding-left: 20px;
    `
  }}

  // Active for button group
  ${props => {
    return props.active && css`
      color: #fff;
      border: 1px solid transparent;
      background-color: #6d6c6d;
      background-image: none;

      &:not(:first-child) {
        border-left: 0!important;
      }

      ${IconStyled} {
        color: #fff;
      }
    `
  }}
`;