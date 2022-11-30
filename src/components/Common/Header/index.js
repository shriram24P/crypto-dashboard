import { Switch } from "@mui/material";
import React, { useState } from "react";
import Button from "../Button/Button";
import MobileDrawer from "./Drawer";
import { Link } from "react-router-dom";
import "./styles.css";

function Header() {
  const setDark = () => {
    localStorage.setItem("theme", "dark");
    document.documentElement.setAttribute("data-theme", "dark");
  };

  const setLight = () => {
    localStorage.setItem("theme", "light");
    document.documentElement.setAttribute("data-theme", "light");
  };

  const storedTheme = localStorage.getItem("theme");

  const prefersDark =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;

  const defaultDark =
    storedTheme === "dark" || (storedTheme === null && prefersDark);

  if (defaultDark) {
    setDark();
  }

  const [mode, setMode] = useState(defaultDark ? true : false);

  const toggleTheme = (e) => {
    if (!mode) {
      setDark();
    } else {
      setLight();
    }
    setMode(!mode);
  };

  return (
    <div className="navbar">
      <h1 className="heading">
        <Link to="/">
          CryptoTracker<span style={{ color: "var(--blue)" }}>.</span>
        </Link>
      </h1>
      <div className="links">
        <Switch
          checked={!mode}
          onClick={(e) => {
            toggleTheme();
          }}
        />

        <Link
          to="/"
          className="link"
          style={{
            color: "var(--grey) !important",
            cursor: "pointer",
            fontSize: ".8rem",
            fontWeight: "600",
            textDecoration: "none!important",
          }}
        >
          Home
        </Link>

        <Link to="/compare">
          <p className="link">Compare</p>
        </Link>
        <Link to="/watchlist">
          <p className="link">Watchlist</p>
        </Link>
        <Link to="/dashboard">
          <Button text="dashboard" />
        </Link>
      </div>
      <MobileDrawer />
    </div>
  );
}

export default Header;
