import { css } from 'styled-components';

export const propertiesCss = css`
  ${props => props.pullLeft && css`float: left;`}
  ${props => props.pullRight && css`float: right;`}
  ${props => props.hidden && css`display: none;`}
`;