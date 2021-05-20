import React from "react";
import { navLinksDataArr } from "../../Utilities/miscData";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "./Styles/Navbar.css";

export function Navbar({ sideMenuOpen, closeSideMenu, darkTheme }) {
  const { pathname } = useLocation();

  const navLinks = navLinksDataArr.map((navLink, i) => (
    <li
      key={i}
      className={`nav-li ${
        pathname.includes(navLink.path) ? "selected-link" : ""
      }`}
      onClick={() => closeSideMenu()}
    >
      <Link to={{ pathname: navLink.path }} className="nav-link">
        {navLink.name}
      </Link>
    </li>
  ));

  return (
    <nav
      className={`navbar ${sideMenuOpen ? "nav-side-open" : ""} ${
        darkTheme ? "nav-dark" : ""
      }`}
    >
      <ul>{navLinks}</ul>
    </nav>
  );
}
