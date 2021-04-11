import styled, { css } from 'styled-components';
import { get } from 'lodash';
import { IconStyled } from '@components/Icon/Icon.styles'
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
  cursor: pointer;
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
  font-size: ${({ theme }) => theme.typography.fontSize || '12px'};
  border-radius: ${({ theme }) => theme.flat ? '2px' : '4px' };

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
    const { theme } = props;
    const type = ['primary', 'secondary', 'positive', 'negative', 'warning'].find(key => !!props[key]) || 'secondary';
    const getProp = path => get(theme, `${type}.${path}`);

    return css`
      color: ${getProp('color')};
      text-shadow: ${theme.flat ? 'none' : '0 1px 1px rgba(0, 0, 0, 0.1)'};
      background-color: ${getProp('background')};

      // Flat options
      border-color: ${theme.flat ? 'transparent' : getProp('border')};
      border-bottom-color: ${theme.flat ? 'transparent' : getProp('borderBottom')};
      background-image: ${theme.flat ? 'none' : `linear-gradient(to bottom, ${getProp('background')} 0%, ${getProp('gradient')} 100%)`};

      ${props => {
        return props.active && css`
          color: #fff;
          border: 1px solid transparent;
          background-color: ${getProp('active.background')};
          background-image: none;
    
          &:not(:first-child) {
            border-left: 0 !important;
          }
    
          ${IconStyled} {
            color: #fff;
          }
        `
      }}
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
`;