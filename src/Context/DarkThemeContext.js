import React, { useState, createContext } from "react";

export const DarkThemeContext = createContext();

export function DarkThemeProvider({ children }) {
  const [darkTheme, setDarkTheme] = useState(true);

  const handleThemeChange = () => {
    setDarkTheme((prevDarkTheme) => !prevDarkTheme);
  };

  return (
    <DarkThemeContext.Provider
      value={{
        darkTheme,
        handleThemeChange,
      }}
    >
      {children}
    </DarkThemeContext.Provider>
  );
}
