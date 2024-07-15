import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Register from "./Components/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./Components/Login";
import Hello from "./Components/Hello";
import User from "./Components/User";
import Admin from "./Components/Admin";
import ForgotPassword from "./Components/ForgotPassword";
import ResetPassword from "./Components/ResetPassword";


// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ element, roles }) => {
  const jwtToken = localStorage.getItem("jwtToken");
  const userRoles = JSON.parse(localStorage.getItem("roles"))[0] || [];

  if (!jwtToken || roles[0] !== userRoles) {
    return <Navigate to="/hello" />;
  }

  return element;
};

function App() {

  return (
    <Router>
   
        <Routes>
          <Route path="/" element={<Hello />} />
          <Route path="/hello" element={<Hello />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          <Route
            path="/user"
            element={<PrivateRoute roles={["ROLE_USER"]} element={<User />} />}
          />
          <Route
            path="/admin"
            element={
              <PrivateRoute roles={["ROLE_ADMIN"]} element={<Admin />} />
            }
          />
        </Routes>

      <ToastContainer />
    </Router>
  );
}

export default App;
