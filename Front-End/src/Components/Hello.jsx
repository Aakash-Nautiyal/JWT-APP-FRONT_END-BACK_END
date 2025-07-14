import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "../Styles/Hello.css";
import { useEffect, useRef } from "react";
import { FaSignInAlt, FaUserPlus, FaUnlockAlt } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const Hello = () => {
  const { t, i18n } = useTranslation();
  const currentLang = useRef(i18n.language); // store current language
  const typedTimeouts = useRef([]); // track timeouts to clear later

  const typeText = (text) => {
    const typedText = document.querySelector(".typed-text");
    if (!typedText) return;

    // Clear previous timeouts if any
    typedTimeouts.current.forEach((timeout) => clearTimeout(timeout));
    typedTimeouts.current = [];

    typedText.textContent = "";
    const textArray = text.split("");

    textArray.forEach((char, index) => {
      const timeout = setTimeout(() => {
        typedText.textContent += char;
      }, index * 100);
      typedTimeouts.current.push(timeout);
    });
  };

  useEffect(() => {
    if (!i18n.isInitialized) return;

    const newLang = i18n.language;

    // On initial render or when language changes
    if (currentLang.current !== newLang || typedTimeouts.current.length === 0) {
      currentLang.current = newLang;
      typeText(t("hello.title"));
    }
  }, [t, i18n.language]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <nav>
        <ul>
          <li>
            <Link to="/login">
              <FaSignInAlt style={{ marginRight: "4px" }} />
              {t("hello.login")}
            </Link>
          </li>
          <li>
            <Link to="/register">
              <FaUserPlus style={{ marginRight: "8px" }} />
              {t("hello.register")}
            </Link>
          </li>
          <li>
            <Link to="/forgot-password">
              <FaUnlockAlt style={{ marginRight: "8px" }} />
              {t("hello.forgotPassword")}
            </Link>
          </li>
        </ul>
      </nav>

      <div className="hello-container">
        <h1 className="typed-text">{/* animated text */}</h1>
        <p>{t("hello.madeBy")}</p>
      </div>
    </motion.div>
  );
};

export default Hello;
