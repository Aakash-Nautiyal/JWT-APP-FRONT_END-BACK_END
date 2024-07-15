import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { AiFillHome } from "react-icons/ai";
import "../Styles/Admin.css";
// import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";

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

  useEffect(() => {
    console.log(username);
    toast.success("Login successful!");
    const token = localStorage.getItem("jwtToken");
    if (token) {
      const decodedToken = decodeJWT(token);
      if (decodedToken) {
        setUsername(decodedToken.sub);
      }
    }

    // Typing animation
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
      transition={{ duration: 1 }}
    >
      <nav>
        <ul>
          <li>
            <Link to="/hello">
              <AiFillHome style={{ marginRight: "8px" }} />
              Go back to home
            </Link>
          </li>
        </ul>
      </nav>
      <div className="user-container">
        <div className="smiley-container">
          <p className="smiley-text">^_____^</p>
        </div>
        <h1 className="typed-text"> Welcome back Admin...!</h1>
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
