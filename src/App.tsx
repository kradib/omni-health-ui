import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import { RouteConstants } from "./Constants";
import Appointments from "./pages/Appointments";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import Documents from "./pages/Documents";

const App = () => (
  <ThemeProvider theme={theme}>
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Navigate to={RouteConstants.LOGIN_ROUTE} />}
        />
        <Route
          path={RouteConstants.LOGIN_ROUTE}
          element={<PublicRoute element={<Login />} />}
        />
        <Route
          path={RouteConstants.REGISTER_ROUTE}
          element={<PublicRoute element={<Register />} />}
        />
        <Route
          path={RouteConstants.FORGOT_PASSWORD_ROUTE}
          element={<ForgotPassword />}
        />
        <Route
          path={RouteConstants.APPOINTMENT_ROUTE}
          element={<ProtectedRoute element={<Appointments />} />}
        />

        <Route
          path={RouteConstants.DOCUMENT_ROUTE}
          element={<ProtectedRoute element={<Documents />} />}
        />
      </Routes>
    </Router>
  </ThemeProvider>
);

export default App;
