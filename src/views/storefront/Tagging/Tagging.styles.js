import styled from 'styled-components'

export const TaggingActions = styled.div`
  display: flex;
  padding: 5px 0;
`;

export const TaggingHeading = styled.div`
  font-size: 1.25em;
  text-align: center;
  padding: 5px 10px;
  background: #f5f5f5;
  border-bottom: 1px solid #dadada;
`;

export const TaggingSchemaWrapper = styled.div`
  margin: ${props => props.margin ? props.margin : '10px' };
`;