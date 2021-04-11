import styled from 'styled-components';

export const TaggingEventWrapper = styled.div`
  display: block;
  margin: 10px 0;
  border-radius: 3px;
  overflow: hidden;
  font-family: Consolas, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New;
  font-size: 11px;
`;

export const TaggingEventHeader = styled.pre`
  margin: 0;
  border: 0;
  border-radius: 0;
  background: ${props => props.light ? '#454658' : '#454658'};
  color: #f5f5f5;
  padding: 10px;
`;

export const TaggingEventContent = styled.pre`
  margin: 0;
  border: 0;
  border-radius: 0;
  background: #f5f5f5;
  color: #222222;
  padding: 10px;
`;