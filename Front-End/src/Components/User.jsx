import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { AiFillHome } from "react-icons/ai";
import "../Styles/User.css";
import { toast, ToastContainer } from "react-toastify";
import { useTranslation } from "react-i18next";
import i18next from "i18next";

// Decode JWT function
const decodeJWT = (token) => {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );

    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("Invalid token", error);
    return null;
  }
};

const User = () => {
  const { t } = useTranslation();
  const [username, setUsername] = useState("");

  // Get username from token
  useEffect(() => {
    toast.success(t("user.loginSuccess"));
    const token = localStorage.getItem("jwtToken");
    if (token) {
      const decodedToken = decodeJWT(token);
      if (decodedToken) {
        setUsername(decodedToken.sub);
      }
    }
  }, []);

  // Typing animation when username or language changes
  useEffect(() => {
    if (!username) return;

    const typedText = document.querySelector(".typed-text");
    const translatedText = t("user.welcome", { username });

    typedText.textContent = "";
    translatedText.split("").forEach((char, index) => {
      setTimeout(() => {
        typedText.textContent += char;
      }, index * 100);
    });
  }, [username, i18next.language]); // 🔥 Now it runs on language change

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
              {t("user.backToHome")}
            </Link>
          </li>
        </ul>
      </nav>
      <div className="user-container">
        <div className="smiley-container">
          <p className="smiley-text">^_____^</p>
        </div>
        <h1 className="typed-text"></h1>
      </div>
      <ToastContainer />
    </motion.div>
  );
};

export default User;
