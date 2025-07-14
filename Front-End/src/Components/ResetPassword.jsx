import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../Styles/ResetPassword.css";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const ResetPassword = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const { username } = location.state || {};
  const navigate = useNavigate();

  const initialValues = {
    otp: "",
    newPassword: "",
  };

  useEffect(() => {
    if (username === undefined) {
      navigate("/forgot-password");
    } else {
      toast.success(t("reset.otpSent"));
    }
  }, []);

  const validationSchema = Yup.object({
    otp: Yup.string().required(t("reset.otpRequired")),
    newPassword: Yup.string()
      .required(t("reset.newPasswordRequired"))
      .min(6, t("reset.newPasswordLength")),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post("http://localhost:8081/reset-password", {
        username,
        otp: values.otp,
        newPassword: values.newPassword,
      });

      if (response.data === "Password reset successfully") {
        toast.success(t("reset.success"));
      } else {
        toast.error(response.data);
      }
    } catch (error) {
      toast.error(error.response ? error.response.data : t("reset.fail"));
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
      <h2>{t("reset.title")}</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <label htmlFor="otp">{t("reset.otp")}</label>
              <Field name="otp" type="text" />
              <ErrorMessage name="otp" component="div" className="error" />
            </div>
            <div>
              <label htmlFor="newPassword">{t("reset.newPassword")}</label>
              <Field name="newPassword" type="password" />
              <ErrorMessage
                name="newPassword"
                component="div"
                className="error"
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="reset-button"
            >
              {t("reset.submit")}
            </button>
            <button
              type="button"
              onClick={handleBackToHome}
              className="back-to-home-button"
            >
              {t("reset.backToHome")}
            </button>
          </Form>
        )}
      </Formik>
      <ToastContainer />
    </motion.div>
  );
};

export default ResetPassword;
