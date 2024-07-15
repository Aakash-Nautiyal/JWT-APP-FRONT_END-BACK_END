import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "../Styles/Hello.css";
import { useEffect } from "react";
import { FaSignInAlt, FaUserPlus, FaUnlockAlt } from "react-icons/fa";

const Hello = () => {
  useEffect(() => {
    const typedText = document.querySelector(".typed-text");
    const textArray = typedText.textContent.split("");
    typedText.textContent = "";
    textArray.forEach((char, index) => {
      setTimeout(() => {
        typedText.textContent += char;
      }, index * 100);
    });
  }, []);

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
              Login
            </Link>
          </li>
          <li>
            <Link to="/register">
              <FaUserPlus style={{ marginRight: "8px" }} />
              Register
            </Link>
          </li>
          <li>
            <Link to="/forgot-password">
              <FaUnlockAlt style={{ marginRight: "8px" }} />
              Forgot Password
            </Link>
          </li>
        </ul>
      </nav>
      <div className="hello-container">
        <h1 className="typed-text">Welcome to the JWT authentication page</h1>
        <p>made by Aakash Nautiyal</p>
      </div>
    </motion.div>
  );
};

export default Hello;
