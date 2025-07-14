import { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { ProgressSpinner } from "primereact/progressspinner";
import "../Styles/ForgotPassword.css";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const ForgotPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const initialValues = {
    username: "",
  };

  const validationSchema = Yup.object({
    username: Yup.string().required(t("forgot.usernameRequired")),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      setIsLoading(true);
      const response = await axios.post(
        `http://localhost:8081/forgot-password/${values.username}`
      );

      if (response.data === true) {
        navigate("/reset-password", {
          state: { username: values.username },
        });
      } else {
        toast.error(t("forgot.otpError"));
      }
    } catch (error) {
      toast.error(error.response ? error.response.data : t("forgot.otpFail"));
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
      <h2>{t("forgot.title")}</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <label htmlFor="username">{t("forgot.username")}</label>
              <Field name="username" type="text" />
              <ErrorMessage name="username" component="div" className="error" />
            </div>
            <button type="submit" disabled={isSubmitting} className="OTP-button">
              {t("forgot.sendOtp")}
            </button>

            <button
              type="button"
              onClick={handleBackToHome}
              className="back-to-home-button"
            >
              {t("forgot.backToHome")}
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
