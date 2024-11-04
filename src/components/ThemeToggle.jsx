// src/components/ThemeToggle.jsx
"use client";
import React from 'react';
import { useTheme } from "../context/ThemeContext";
import { themes } from "../context/ThemeContext";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  const handleThemeChange = (event) => {
    setTheme(event.target.value);
  };

  return (
    <select onChange={handleThemeChange} value={theme} className="select border rounded px-2 py-1">
      {Object.keys(themes).map((themeKey) => (
        <option key={themeKey} value={themes[themeKey]}>
          {themes[themeKey].charAt(0).toUpperCase() + themes[themeKey].slice(1)}
        </option>
      ))}
    </select>
  );
};

export default ThemeToggle;