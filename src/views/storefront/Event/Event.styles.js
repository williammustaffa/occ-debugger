import styled, { css } from 'styled-components';

export const EventWrapper = styled.div`
  display: block;
  border-radius: 3px;
  overflow: hidden;
  font-family: Consolas, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New;
  font-size: 11px;
  margin: 10px 0;
`;

export const EventHeader = styled.pre`
  margin: 0;
  border: 0;
  border-radius: 0;
  background: ${props => props.light ? '#6b70c5' : props.theme.toolbar.background};
  color: #f5f5f5;
  padding: 10px;
`;

export const EventContent = styled.pre`
  margin: 0;
  border: 0;
  border-radius: 0;
  background: #f5f5f5;
  color: #222222;
  padding: 10px;
  overflow: auto;
  position: relative;

  ${props => props.collapsed && css`
    max-height: 100px;
    overflow: hidden;

    &:after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 20px;
      background: linear-gradient(transparent, #f5f5f5);
    }
  `}
`;

export const EventFooter = styled.div`
  margin: 0;
  border: 0;
  border-top: 1px solid #d9d9d9;
  border-radius: 0;
  background: #f5f5f5;
  color: #222222;
  display: flex;
`;

export const EventAction = styled.div`
  text-align: center;
  flex: 1;
  cursor: pointer;
  padding: 10px;
  background: #f5f5f5;
  color: #828282;
  transition: all 0.2s ease-in-out;

  & + & {
    border-left: 1px solid #d9d9d9;
  }

  &:hover {
    background: #dfdfdf;
  }
`;