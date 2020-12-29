import styled, { css } from 'styled-components'

// Overriding checkbox css here
export const Content = styled.div`
  position: relative;
  padding: 10px;
  min-height: ${props => props.height || 0}px;

  ${props => props.centered && css`
    display: flex;
    align-items: center;
    justify-content: center;
  `}
`;

export const Section = styled.div`
  margin: 0 0 10px;
`;

export const SectionTitle = styled.div`
  font-weight: bold;
  margin: 0 0 5px;
  font-size: 12px;
  color: #555;
  text-align: center;
`;