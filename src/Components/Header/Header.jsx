import React, { useState, useContext } from "react";
import { Navbar } from "./Navbar";
import { DarkThemeContext } from "../../Context/DarkThemeContext";
import "./Styles/Header.css";

export function Header() {
  const { darkTheme, handleThemeChange } = useContext(DarkThemeContext);

  const [sideMenuOpen, setSideMenuOpen] = useState(false);

  const handleSideMenuOpen = () => {
    setSideMenuOpen((prevSideMenuOpen) => !prevSideMenuOpen);
  };

  const closeSideMenu = () => {
    setSideMenuOpen(false);
  };

  return (
    <header className={`app-header ${darkTheme ? "head-dark" : ""}`}>
      <div id="logo-wrapper">Hacker News</div>
      <Navbar
        sideMenuOpen={sideMenuOpen}
        closeSideMenu={closeSideMenu}
        darkTheme={darkTheme}
      />
      <div className="theme-toggle-wrap">
        <div
          className={`theme-toggle-bar ${darkTheme ? "bar-dark" : ""}`}
          onClick={() => handleThemeChange()}
        ></div>
      </div>
      <div className="hamburger-wrap" onClick={() => handleSideMenuOpen()}>
        <div className={`hamburger ${sideMenuOpen ? "menu-open" : ""}`}></div>
      </div>
    </header>
  );
}
