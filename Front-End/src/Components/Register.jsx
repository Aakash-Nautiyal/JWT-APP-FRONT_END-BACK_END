import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../Styles/Register.css";
import "../Styles/ToastStyles.css";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Register = () => {
  const initialValues = {
    username: "",
    password: "",
    email: "",
  };

  const navigate = useNavigate();

  const validationSchema = Yup.object({
    username: Yup.string()
      .required("Username is required")
      .matches(/^[a-zA-Z0-9_]+$/, "cannot use special characters")
      .test("len", "ncrease the length", (val) => val.length >= 3),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Increase the length"),
    email: Yup.string()
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Invalid email format"
      )
      .required("Email is required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post(
        "http://localhost:8081/register",
        values
      );
      if (response.data === "User already exists") {
        toast.error("User already exists");
      }
      else {
        toast.success("Registration successfully completed."); // Display success message from server
        console.log(response.data);
      }
    } catch (error) {
      toast.error(error.response ? error.response.data : "Registration failed");
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
      <h2>Register</h2>
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
            <div>
              <label htmlFor="password">Password</label>
              <Field name="password" type="password" />
              <ErrorMessage name="password" component="div" className="error" />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <Field name="email" type="email" />
              <ErrorMessage name="email" component="div" className="error" />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="register-button"
            >
              Register
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
