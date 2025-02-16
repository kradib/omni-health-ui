import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { AUTH_TOKEN_KEY, RouteConstants } from "../Constants";
import NavBar from "./NavBar";

interface ProtectedRouteProps {
    element: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
    const authToken = localStorage.getItem(AUTH_TOKEN_KEY);

    const isAuthenticated = !!authToken?.length;

    if (!isAuthenticated) {
        return <Navigate to={`/${RouteConstants.LOGIN_ROUTE}`} replace />;
    }

    return <NavBar>{element}</NavBar>;
};

export default ProtectedRoute;
