import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import { useState } from "react";
import { AUTH_TOKEN_KEY, RouteConstants, SNACKBAR_TIMEOUT } from "../Constants";
import { signinUser } from "../api/user";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

// Example function to save the token to localStorage
const saveTokenToLocalStorage = (token: string) => {
    localStorage.setItem(AUTH_TOKEN_KEY, token);  // 'authToken' is the key, token is the value
};

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setLoading] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
        "success"
    );
    const navigate = useNavigate();

    const handleLogin = async () => {
        setLoading(true);
        const response = await signinUser(username, password);
        setLoading(false);

        if (response.success) {
            // Set bearer token
            const token = response.data.authToken;
            saveTokenToLocalStorage(token);
            navigate(`/${RouteConstants.DASHBOARD_ROUTE}`);
            return;
        }
        setSnackbarMessage(response.data);
        setSnackbarSeverity(response.success ? "success" : "error");
        setOpenSnackbar(true);
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        alignItems: "center",
                        minHeight: "98vh",
                        p: 1,
                    }}
                >
                    <Stack spacing={2}>
                        <Typography variant="h4">Welcome Back!👋</Typography>
                        <Typography variant="subtitle1">
                            We're excited to have you here again
                        </Typography>

                        <TextField
                            id="username"
                            label="Username"
                            onChange={(e) => setUsername(e.target.value)}
                            variant="outlined"
                            value={username}
                        />

                        <TextField
                            id="password"
                            type="password"
                            label="Password"
                            onChange={(e) => setPassword(e.target.value)}
                            variant="outlined"
                            value={password}
                        />

                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "flex-end",
                            }}
                        >
                            <Typography variant="subtitle1">
                                <Link
                                    href={RouteConstants.FORGOT_PASSWORD_ROUTE}
                                    underline="none"
                                >
                                    Forgot Password?
                                </Link>
                            </Typography>
                        </Box>

                        {!isLoading && (
                            <Button
                                variant="contained"
                                disabled={!(username.length > 0 && password.length > 0)}
                                onClick={handleLogin}
                                size="large"
                            >
                                Sign In
                            </Button>
                        )}
                        {isLoading && (
                            <Box
                                display="flex"
                                justifyContent="center"
                                alignItems="center"
                                ml={2}
                            >
                                <CircularProgress size={24} sx={{ marginLeft: 2 }} />
                            </Box>
                        )}
                    </Stack>

                    <Snackbar
                        open={openSnackbar}
                        autoHideDuration={SNACKBAR_TIMEOUT}
                        anchorOrigin={{ vertical: "top", horizontal: "center" }}
                        onClose={handleCloseSnackbar}
                    >
                        <Alert
                            onClose={handleCloseSnackbar}
                            severity={snackbarSeverity}
                            sx={{ width: "100%" }}
                        >
                            {snackbarMessage}
                        </Alert>
                    </Snackbar>

                    <div>
                        <Typography variant="subtitle1">
                            Not yet registered?{" "}
                            <Link href={RouteConstants.REGISTER_ROUTE} underline="none">
                                Register Here
                            </Link>
                        </Typography>
                    </div>
                </Box>
            </Box>
        </>
    );
};

export default Login;
