import React, { createContext, useContext, useState, useEffect } from 'react';
import fetch from 'node-fetch';

export interface Palette {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
}

export interface Typography {
  fontFamily: string;
  baseFontSize: string;
}

export interface Spacing {
  small: string;
  medium: string;
  large: string;
}

export interface Theme {
  palette: Palette;
  typography: Typography;
  spacing: Spacing;
  logoURL: string;
  tagline: string;
}

const defaultTheme: Theme = {
  palette: {
    primary: "#002244",
    secondary: "#CCCCCC",
    accent: "#D32F2F",
    background: "#FFFFFF",
    text: "#000000"
  },
  typography: {
    fontFamily: "Arial, sans-serif",
    baseFontSize: "16px"
  },
  spacing: {
    small: "8px",
    medium: "16px",
    large: "24px"
  },
  logoURL: "",
  tagline: "Your Trusted App"
};

const ThemeContext = createContext<Theme>(defaultTheme);

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState(defaultTheme);

  useEffect(() => {
    fetch('http://localhost:3000/brand/config')
      .then(res => res.json())
      .then((config: Theme) => {
        // Accessibility contrast check stub
        // (real check would use axe-core or similar in build pipeline)
        setTheme(config);
      })
      .catch(err => {
        console.error("Error loading theme config:", err);
        setTheme(defaultTheme);
      });
  }, []);

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};