import React from 'react';
import { ThemeProvider } from './ThemeManager';
import { Banner } from './components/Banner';
import { Footer } from './components/Footer';
import { ContentArea } from './components/ContentArea';

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <Banner />
      <ContentArea />
      <Footer />
    </ThemeProvider>
  );
};