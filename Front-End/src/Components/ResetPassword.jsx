import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../Styles/ResetPassword.css"; // Ensure you create this CSS file similar to Register.css
import { motion } from "framer-motion";

const ResetPassword = () => {
  const location = useLocation();
  const { username } = location.state || {};
  const navigate = useNavigate();

  const initialValues = {
    otp: "",
    newPassword: "",
  };

  useEffect(() => {
   if (username === undefined) navigate("/forgot-password");
    
        toast.success("OTP has been sent to your email.");
    },[]);
  const validationSchema = Yup.object({
    otp: Yup.string().required("OTP is required"),
    newPassword: Yup.string()
      .required("New password is required")
      .min(6, "New password must be at least 6 characters long"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {

    console.log(username,
      "otp:", values.otp,
      "newPassword:", values.newPassword);
    try {
      const response = await axios.post(
        "http://localhost:8081/reset-password",
        {
          username,
          otp: values.otp,
          newPassword: values.newPassword,
        }
      );
      if (response.data === "Password reset successfully") {
        toast.success(response.data);
      } else {
        toast.error(response.data);
      }
    } catch (error) {
      toast.error(
        error.response ? error.response.data : "Failed to reset password."
      );
    } finally {
      setSubmitting(false);
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
      <h2>Reset Password</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <label htmlFor="otp">OTP</label>
              <Field name="otp" type="text" />
              <ErrorMessage name="otp" component="div" className="error" />
            </div>
            <div>
              <label htmlFor="newPassword">New Password</label>
              <Field name="newPassword" type="password" />
              <ErrorMessage
                name="newPassword"
                component="div"
                className="error"
              />
            </div>
            <button type="submit" disabled={isSubmitting} className="reset-button">
              Reset Password
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
    </motion.div>
  );
};

export default ResetPassword;
