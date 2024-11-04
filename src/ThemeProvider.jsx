// src/contexts/ThemeProvider.jsx
"use client";
import React, { useState, useEffect } from 'react';
import ThemeContext, { themes } from './context/ThemeContext';

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(
    typeof window !== "undefined" && localStorage.getItem("theme") || themes.light
  );

  const changeTheme = (newTheme) => {
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme: changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
