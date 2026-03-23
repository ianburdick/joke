import React from 'react';
import styled from 'styled-components';
import { useTheme } from '../ThemeManager';

const ContentWrapper = styled.main`
  display: grid;
  grid-template-columns: 1fr;
  padding: ${(props) => props.theme.spacing.medium};
  background-color: ${(props) => props.theme.palette.background};
  color: ${(props) => props.theme.palette.text};
  font-family: ${(props) => props.theme.typography.fontFamily};
  font-size: ${(props) => props.theme.typography.baseFontSize};
  @media (min-width: 768px) {
    grid-template-columns: 200px 1fr;
  }
`;

export const ContentArea: React.FC = () => {
  const theme = useTheme();
  return (
    <ContentWrapper theme={theme}>
      <section>
        <h1>Welcome</h1>
        <p>This is the content area styled with the current theme.</p>
      </section>
    </ContentWrapper>
  );
};