import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../Styles/Register.css";
import "../Styles/ToastStyles.css";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const Register = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const initialValues = {
    username: "",
    password: "",
    email: "",
  };

  const validationSchema = Yup.object({
    username: Yup.string()
      .required(t("register.usernameRequired"))
      .matches(/^[a-zA-Z0-9_]+$/, t("register.usernameInvalid"))
      .test("len", t("register.usernameLength"), (val) => val.length >= 3),
    password: Yup.string()
      .required(t("register.passwordRequired"))
      .min(6, t("register.passwordLength")),
    email: Yup.string()
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        t("register.emailInvalid")
      )
      .required(t("register.emailRequired")),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post(
        "http://localhost:8081/register",
        values
      );
      if (response.data === "User already exists") {
        toast.error(t("register.userExists"));
      } else {
        toast.success(t("register.success"));
        console.log(response.data);
      }
    } catch (error) {
      toast.error(error.response ? error.response.data : t("register.fail"));
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
      <h2>{t("register.title")}</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <label htmlFor="username">{t("register.username")}</label>
              <Field name="username" type="text" />
              <ErrorMessage name="username" component="div" className="error" />
            </div>

            <div>
              <label htmlFor="password">{t("register.password")}</label>
              <Field name="password" type="password" />
              <ErrorMessage name="password" component="div" className="error" />
            </div>

            <div>
              <label htmlFor="email">{t("register.email")}</label>
              <Field name="email" type="email" />
              <ErrorMessage name="email" component="div" className="error" />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="register-button"
            >
              {t("register.submit")}
            </button>

            <button
              type="button"
              onClick={handleBackToHome}
              className="back-to-home-button"
            >
              {t("register.backToHome")}
            </button>
          </Form>
        )}
      </Formik>

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

export default Register;
