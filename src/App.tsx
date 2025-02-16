import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register'
import ForgotPassword from './pages/ForgotPassword';
import { RouteConstants } from './Constants';
import Dashboard from './pages/Dashboard';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Navigate to={RouteConstants.LOGIN_ROUTE} />} />
      <Route path={RouteConstants.LOGIN_ROUTE} element={<Login />} />
      <Route path={RouteConstants.REGISTER_ROUTE} element={<Register />} />
      <Route path={RouteConstants.FORGOT_PASSWORD_ROUTE} element={<ForgotPassword />} />
      <Route path={RouteConstants.DASHBOARD_ROUTE} element={<Dashboard />} />
    </Routes>
  </Router>
);

export default App
