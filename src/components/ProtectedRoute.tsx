import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { AUTH_TOKEN_KEY, RouteConstants } from "../Constants";
import NavBar from "./NavBar";
import { getUserDetailFromLocalStorage } from "../utils/Utils";

interface ProtectedRouteProps {
    title: string;
    element: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ title, element }) => {
    const authToken = localStorage.getItem(AUTH_TOKEN_KEY);
    const userDetails = getUserDetailFromLocalStorage();

    const isAuthenticated = !!authToken?.length && userDetails;

    if (!isAuthenticated) {
        return <Navigate to={`/${RouteConstants.LOGIN_ROUTE}`} replace />;
    }

    return <NavBar title={title}>{element}</NavBar>;
};

export default ProtectedRoute;
