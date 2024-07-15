import { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { ProgressSpinner } from "primereact/progressspinner";
import "../Styles/ForgotPassword.css"; // Ensure you create this CSS file similar to Register.css
import { motion } from "framer-motion";

// eslint-disable-next-line react/prop-types
const ForgotPassword = () => {

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const initialValues = {
    username: "",
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      setIsLoading(true);
      const response = await axios.post(
        `http://localhost:8081/forgot-password/${values.username}`
      );
      console.log("\n\nRESPONSE DATA ", response.data);
      if (response.data === true) {
        
        navigate("/reset-password", {
          state: { username: values.username },
        });
      } else {
        toast.error("Failed to send OTP. Username is incorrect.");
      }
    } catch (error) {
      toast.error(error.response ? error.response.data : "Failed to send OTP.");
    } finally {
      setSubmitting(false);
      setIsLoading(false);
    }
  };

  const handleBackToHome = () => {
    navigate("/");
  };

  return (
    <motion.div
      initial={{ opacity: 0, rotateY: 90 }}
      animate={{ opacity: 1, rotateY: 0 }}
      exit={{ opacity: 0, rotateY: 90 }}
      transition={{ duration: 0.5 }}
      className="container"
    >
      <h2>Forgot Password</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <label htmlFor="username">Username</label>
              <Field name="username" type="text" />
              <ErrorMessage name="username" component="div" className="error" />
            </div>
            <button type="submit" disabled={isSubmitting} className="OTP-button">
              Send OTP
            </button>

            <button
              type="button"
              onClick={handleBackToHome}
              className="back-to-home-button"
            >
              Back to Home
            </button>
          </Form>
        )}
      </Formik>
      <ToastContainer />
      <div className="loaderWrapper">
        {isLoading && (
          <ProgressSpinner
            style={{ width: "100%", height: "50px", marginTop: "20px" }}
            strokeWidth="8"
            fill="var(--surface-ground)"
            animationDuration="2s"
          />
        )}
      </div>
    </motion.div>
  );
};

export default ForgotPassword;
