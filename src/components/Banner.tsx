import React from 'react';
import styled from 'styled-components';
import { useTheme } from '../ThemeManager';

const BannerContainer = styled.header<{ bg: string; textColor: string }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${(props) => props.theme.spacing.medium};
  background-color: ${(props) => props.bg};
  color: ${(props) => props.textColor};
  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Logo = styled.img`
  max-height: 50px;
  @media (max-width: 600px) {
    max-height: 40px;
  }
`;

const Tagline = styled.p`
  font-size: 1.2em;
  margin: 0;
`;

export const Banner: React.FC = () => {
  const theme = useTheme();
  const logoSrc = theme.logoURL || '/placeholder-logo.svg';

  return (
    <BannerContainer bg={theme.palette.primary} textColor={theme.palette.text} theme={theme}>
      <Logo src={logoSrc} alt="App Logo" />
      <Tagline>{theme.tagline}</Tagline>
    </BannerContainer>
  );
};