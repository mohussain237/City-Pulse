
import React from "react";

function LanguageToggle({ lang, setLang }) {
  const toggle = () => {
    setLang(lang === "en" ? "ar" : "en");
  };

  return (
    <button onClick={toggle} className="lang-btn">
      {lang === "en" ? "AR" : "EN"}
    </button>
  );
}

export default LanguageToggle;
