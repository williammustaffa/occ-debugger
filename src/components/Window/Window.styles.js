import styled, { css } from 'styled-components';
import { getProps } from '@components/GlobalTheme';

export const WindowWrapper = styled.div`
  position: relative;
  height: ${props => props.height ? `${props.height}px`: 'auto'};
  width: ${props => props.width ? `${props.width}px`: 'auto'};
`;

export const WindowStyled = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  background-color: #fff;
`;

export const WindowContentStyled = styled.div`
  position: relative;
  overflow-y: auto;
  display: flex;
  flex: 1;
`;