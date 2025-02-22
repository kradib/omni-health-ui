import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { AUTH_TOKEN_KEY, RouteConstants } from "../Constants";

interface PublicRouteProps {
    element: ReactNode;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ element }) => {
    const authToken = localStorage.getItem(AUTH_TOKEN_KEY);

    const isAuthenticated = !!authToken?.length;

    if (isAuthenticated) {
        return <Navigate to={`/${RouteConstants.APPOINTMENT_ROUTE}`} replace />;
    }

    return element;
};

export default PublicRoute;
