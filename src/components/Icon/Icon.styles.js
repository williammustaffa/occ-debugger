import styled, { css } from 'styled-components';
import iconMap from '@fonts/icon-map.json';

export const IconStyled = styled.span`
  &:before {
   position: relative;
   display: inline-block;
   font-family: "photon-entypo";
   font-size: 100%;
   font-style: normal;
   font-weight: normal;
   font-variant: normal;
   text-transform: none;
   line-height: 1;
   -webkit-font-smoothing: antialiased;
   -moz-osx-font-smoothing: grayscale;
  }

  ${({ text }) => text && css`
    margin-right: 5px;
  `}

  ${({ name }) => {
    const icon = iconMap[name];
    if (!icon) return null;

    return css`
      &:before {
        content: '\\${icon}';
      }
    `
  }}
`;