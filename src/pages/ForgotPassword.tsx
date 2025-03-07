import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import {
    RESEND_ATTEMPTS,
    RESEND_TIME_INTERVAL,
    RouteConstants,
} from "../Constants";
import { resetPassword, sendCode } from "../api/user";
import Toast from "../components/Toast";
import { useNavigate } from "react-router";
import { REDIRECT_TIMEOUT } from "./Register";
import PasswordField from "../components/PasswordField";
import Link from '@mui/material/Link';
const ForgotPassword = () => {
    const [isVerificationCodeSent, setIsVerificationCodeSent] = useState(false);
    const [username, setUsername] = useState("");
    const [verificationCode, setVerificationCode] = useState("");
    const [seconds, setSeconds] = useState(0);
    const [resendAttempts, setResendAttempts] = useState(0);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const [openToast, setOpenToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [toastSeverity, setToastSeverity] = useState<"success" | "error">(
        "success"
    );
    const navigate = useNavigate();

    useEffect(() => {
        const interval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }

            if (seconds === 0) {
                clearInterval(interval);
            }
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    });

    const handleCloseSnackbar = () => {
        setOpenToast(false);
    };

    const setToast = (message: string, severity: "success" | "error") => {
        setOpenToast(true);
        setToastMessage(message);
        setToastSeverity(severity);
    };

    const handleSendVerificationCode = async () => {
        setLoading(true);
        const response = await sendCode(username);
        setLoading(false);

        if (response.success) {
            setResendAttempts(resendAttempts + 1);
            setIsVerificationCodeSent(true);
            setSeconds(RESEND_TIME_INTERVAL);

            setToast("Verification code sent successfully", "success");
            return;
        }
        setToast(response.data, "error");
    };

    const handleChangePassword = async () => {
        setLoading(true);
        const response = await resetPassword(verificationCode, password, username);
        setLoading(false);

        if (response.success) {
            setToast(
                "Password reset successfully. Please login with new password.",
                "success"
            );
            setTimeout(() => {
                navigate(`/${RouteConstants.LOGIN_ROUTE}`);
            }, REDIRECT_TIMEOUT);
            return;
        }
        setToast(response.data, "error");
    };

    const sendVerificationCode = () => {
        return (
            <>
                <Stack spacing={2}>
                    <Typography variant="h4">Forgot Password</Typography>
                    <Typography variant="subtitle1">
                        Enter your username to set a new password
                    </Typography>

                    <TextField
                        id="username"
                        label="Username"
                        type="username"
                        required
                        onChange={(e) => setUsername(e.target.value)}
                        variant="outlined"
                        value={username}
                    />

                    <Button
                        variant="contained"
                        disabled={!(username.length > 0)}
                        onClick={handleSendVerificationCode}
                        size="large"
                        loading={loading}
                    >
                        Send Verification Code
                    </Button>
                </Stack>
            </>
        );
    };

    const changePassword = () => {
        return (
            <>
                <Stack spacing={2}>
                    <Typography variant="h4">Enter Verification Code</Typography>
                    <Typography variant="subtitle1">
                        Enter the verification code sent to your email id long with your
                        passwords.
                    </Typography>

                    <TextField
                        id="verificationCode"
                        label="Verification Code"
                        required
                        onChange={(e) => setVerificationCode(e.target.value)}
                        variant="outlined"
                        value={verificationCode}
                    />

                    <PasswordField
                        id="password"
                        label="Password"
                        onChange={(e: any) => setPassword(e.target.value)}
                        value={password}
                    />
                    <PasswordField
                        id="confirmPassword"
                        label="Re-type your Password"
                        onChange={(e: any) => setConfirmPassword(e.target.value)}
                        value={confirmPassword}
                    />

                    <Button
                        variant="contained"
                        disabled={
                            !(
                                !!verificationCode?.length &&
                                !!password?.length &&
                                password == confirmPassword
                            )
                        }
                        onClick={handleChangePassword}
                        size="large"
                        loading={loading}
                    >
                        Submit
                    </Button>

                    {resendAttempts < RESEND_ATTEMPTS ? (
                        <>
                            <Typography align="center" variant="subtitle1">
                                You can resend the verification code in {seconds} seconds.
                            </Typography>
                            <Typography align="center" variant="subtitle1">
                                {seconds <= 0 && resendAttempts < RESEND_ATTEMPTS && (
                                    <Button onClick={handleSendVerificationCode}>
                                        Resend Code
                                    </Button>
                                )}
                            </Typography>
                        </>
                    ) : (
                        <></>
                    )}
                </Stack>
            </>
        );
    };

    return (
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
                    alignItems: "center",
                    justifyContent: "space-between",
                    minHeight: "98vh",
                    p: 1,
                }}
            >
                {!isVerificationCodeSent ? sendVerificationCode() : changePassword()}

                <Toast
                    open={openToast}
                    severity={toastSeverity}
                    message={toastMessage}
                    onClose={handleCloseSnackbar}
                />
                <Typography align="center" variant="subtitle1">
                    Want to go back?{" "}
                    <Link href={RouteConstants.LOGIN_ROUTE} underline="none">
                        Sign In
                    </Link>
                </Typography>
            </Box>

        </Box>
    );
};

export default ForgotPassword;
