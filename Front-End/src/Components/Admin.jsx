import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { AiFillHome } from "react-icons/ai";
import "../Styles/Admin.css";
import { toast, ToastContainer } from "react-toastify";
import { useTranslation } from "react-i18next";

// Function to decode JWT
const decodeJWT = (token) => {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("Invalid token", error);
    return null;
  }
};

const Admin = () => {
  const [username, setUsername] = useState("");
  const { t, i18n } = useTranslation();
  const currentLang = useRef(i18n.language);
  const typedTimeouts = useRef([]);

  const typeText = (text) => {
    const typedText = document.querySelector(".typed-text");
    if (!typedText) return;

    // Clear any previous timeouts
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
    toast.success("Login successful!");
    const token = localStorage.getItem("jwtToken");
    if (token) {
      const decodedToken = decodeJWT(token);
      if (decodedToken) {
        setUsername(decodedToken.sub);
      }
    }
  }, []);

  useEffect(() => {
    if (!i18n.isInitialized) return;

    const newLang = i18n.language;

    if (currentLang.current !== newLang || typedTimeouts.current.length === 0) {
      currentLang.current = newLang;
      typeText(t("admin.title"));
    }
  }, [i18n.language, t]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <nav>
        <ul>
          <li>
            <Link to="/hello">
              <AiFillHome style={{ marginRight: "8px" }} />
              {t("admin.backToHome")}
            </Link>
          </li>
        </ul>
      </nav>

      <div className="user-container">
        <div className="smiley-container">
          <p className="smiley-text">^_____^</p>
        </div>
        <h1 className="typed-text">{/* animated text */}</h1>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </motion.div>
  );
};

export default Admin;
