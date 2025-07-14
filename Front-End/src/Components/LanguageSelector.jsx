import React from "react";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import "../Styles/LanguageSelector.css";

const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <div className="language-selector">
      <FontAwesomeIcon icon={faGlobe} className="globe-icon" />
      <label htmlFor="language" className="language-label">Language</label>
      <select id="language" onChange={changeLanguage} className="language-select">
        <option value="en">English</option>
        <option value="zh">Mandarin</option>
        <option value="hi">Hindi</option>
        <option value="es">Spanish</option>
        <option value="ar">Arabic</option>
      </select>
    </div>
  );
};

export default LanguageSelector;
