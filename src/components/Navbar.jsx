
import React from "react";
import { Link } from "react-router-dom";
import LanguageToggle from "./LanguageToggle";

function Navbar({ lang, setLang, user, logout }) {
  return (
    <nav className={`navbar ${lang === "ar" ? "rtl" : ""}`}>
      <h2 className="nav-brand">
        <Link to="/">CityPulse</Link>
      </h2>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/profile">Profile</Link>

        {user ? (
          <button className="logout-btn" onClick={logout}>
            Logout
          </button>
        ) : (
          <Link to="/login">Login</Link>
        )}

        <LanguageToggle lang={lang} setLang={setLang} />
      </div>
    </nav>
  );
}

export default Navbar;
