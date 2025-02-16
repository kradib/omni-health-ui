import Button from "@mui/material/Button";
import { AUTH_TOKEN_KEY, RouteConstants } from "../Constants";
import { useNavigate } from "react-router";

const Dashboard = () => {
    const navigate = useNavigate();
    function logout(): void {
        localStorage.removeItem(AUTH_TOKEN_KEY);
        navigate(`/${RouteConstants.LOGIN_ROUTE}`);
    }

    return <Button onClick={() => logout()}>Logout</Button>;
};

export default Dashboard;
