// src/contexts/ThemeContext.jsx
"use client";
import { createContext, useContext } from 'react';

// Define the available themes
export const themes = {
  light: 'light',
  dark: 'dark',
  bumblebee: 'bumblebee',
  cupcake: 'cupcake',
};

// Create ThemeContext with default values
const ThemeContext = createContext({
  theme: themes.light,
  setTheme: () => {},
});

// Custom hook to access ThemeContext
export const useTheme = () => useContext(ThemeContext);

export default ThemeContext;
