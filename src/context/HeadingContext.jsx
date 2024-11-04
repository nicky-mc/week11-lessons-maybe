// src/context/HeadingContext.jsx
"use client";
import { createContext, useContext, useState } from "react";

// Create the HeadingContext
const HeadingContext = createContext();

// Custom hook to access HeadingContext with error handling
export const useHeading = () => {
  const context = useContext(HeadingContext);
  if (!context) {
    throw new Error("useHeading must be used within a HeadingProvider");
  }
  return context;
};

// HeadingProvider component to provide the level to children
export function HeadingProvider({ children }) {
  const [level, setLevel] = useState(1); // Default level is 1 (h1)

  return (
    <HeadingContext.Provider value={{ level, setLevel }}>
      {children}
    </HeadingContext.Provider>
  );
}

export default HeadingContext;
