import React from 'react';
import styled from 'styled-components';
import { useTheme } from '../ThemeManager';

const FooterContainer = styled.footer<{ bg: string; textColor: string }>`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: ${(props) => props.theme.spacing.large};
  background-color: ${(props) => props.bg};
  color: ${(props) => props.textColor};
  font-size: 0.9em;
  @media (max-width: 600px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const Footer: React.FC = () => {
  const theme = useTheme();
  return (
    <FooterContainer bg={theme.palette.secondary} textColor={theme.palette.text} theme={theme}>
      <div>© {new Date().getFullYear()} Company</div>
      <div>
        <a href="/privacy" style={{ color: theme.palette.text }}>Privacy Policy</a>
      </div>
    </FooterContainer>
  );
};