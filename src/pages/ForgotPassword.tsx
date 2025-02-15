import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { validateEmail } from "../utils/Utils";
import { RESEND_ATTEMPTS, RESEND_TIME_INTERVAL } from "../Constants";
import Modal from '@mui/material/Modal';
const sendVerificationCode = (
    email: String,
    setEmail: React.Dispatch<React.SetStateAction<string>>,
    setIsVerificationCodeSent: React.Dispatch<React.SetStateAction<boolean>>,
    setSeconds: React.Dispatch<React.SetStateAction<number>>
) => {
    return (
        <>
            <Stack spacing={2}>
                <Typography variant="h4">Forgot Password</Typography>
                <Typography variant="subtitle1">
                    Enter your mail id to set a new password
                </Typography>

                <TextField
                    id="emailId"
                    label="Email ID"
                    type="email"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                    variant="outlined"
                    value={email}
                />

                <Button
                    variant="contained"
                    disabled={!(email.length > 0 && validateEmail(email))}
                    onClick={() => {
                        console.log("Email: " + email);
                        setIsVerificationCodeSent(true);
                        setSeconds(RESEND_TIME_INTERVAL);
                    }}
                    size="large"
                >
                    Send Verification Code
                </Button>
            </Stack>
        </>
    );
};

const verifyCode = (
    verificationCode: String,
    setVerificationCode: React.Dispatch<React.SetStateAction<string>>,
    seconds: number,
    setSeconds: React.Dispatch<React.SetStateAction<number>>,
    resendAttempts: number,
    setResendAttempts: React.Dispatch<React.SetStateAction<number>>,
    email: String,
    setIsVerificationCodeSubmitted: React.Dispatch<React.SetStateAction<boolean>>
) => {
    return (
        <>
            <Stack spacing={2}>
                <Typography variant="h4">Enter Verification Code</Typography>
                <Typography variant="subtitle1">
                    Enter the verification code sent to your email id.
                </Typography>

                <TextField
                    id="verificationCode"
                    label="Verification Code"
                    required
                    onChange={(e) => setVerificationCode(e.target.value)}
                    variant="outlined"
                    value={verificationCode}
                />

                <Button
                    variant="contained"
                    disabled={!(verificationCode.length > 0)}
                    onClick={() => {
                        console.log("Verification code: " + verificationCode);
                        setIsVerificationCodeSubmitted(true);
                    }}
                    size="large"
                >
                    Submit Verification Code
                </Button>
                {resendAttempts < RESEND_ATTEMPTS ? (
                    <>
                        <Typography align="center" variant="subtitle1">
                            You can resend the verification code in {seconds} seconds.
                        </Typography>
                        <Typography align="center" variant="subtitle1">
                            <Button
                                disabled={seconds > 0 || resendAttempts >= RESEND_ATTEMPTS}
                                onClick={() => {
                                    setResendAttempts(resendAttempts + 1);
                                    setSeconds(RESEND_TIME_INTERVAL);
                                    console.log(
                                        "Resend attempts: " + resendAttempts + " Email: " + email
                                    );
                                }}
                            >
                                Resend Code
                            </Button>
                        </Typography>
                    </>
                ) : (
                    <></>
                )}
            </Stack>
        </>
    );
};

const ForgotPassword = () => {
    const [isVerificationCodeSent, setIsVerificationCodeSent] = useState(false);
    const [email, setEmail] = useState("");
    const [verificationCode, setVerificationCode] = useState("");
    const [seconds, setSeconds] = useState(0);
    const [resendAttempts, setResendAttempts] = useState(0);
    const [isVerificationCodeSubmitted, setIsVerificationCodeSubmitted] =
        useState(false);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isPasswordChangeSuccessful, setIsPasswordChangeSuccessful] =
        useState(false);

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

    const changePassword = (
        email: string,
        verificationCode: string,
        password: string,
        setPassword: Dispatch<SetStateAction<string>>,
        confirmPassword: string,
        setConfirmPassword: Dispatch<SetStateAction<string>>,
        isPasswordChangeSuccessful: boolean,
        setIsPasswordChangeSuccessful: Dispatch<SetStateAction<boolean>>
    ) => {
        return (
            <>
                <Stack spacing={2}>
                    <Typography variant="h4">Create new Password</Typography>
                    <Typography variant="subtitle1">Enter your new password.</Typography>

                    <TextField
                        id="password"
                        type="password"
                        label="Password"
                        onChange={(e) => setPassword(e.target.value)}
                        variant="outlined"
                        value={password}
                    />

                    <TextField
                        id="confirmPassword"
                        type="password"
                        label="Re-type your Password"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        variant="outlined"
                        value={confirmPassword}
                    />

                    <Button
                        variant="contained"
                        disabled={
                            !(
                                password.length > 0 &&
                                confirmPassword.length > 0 &&
                                password == confirmPassword
                            )
                        }
                        onClick={() => {
                            console.log(
                                "Verification code: " + verificationCode + "email: " + email
                            );
                            setIsPasswordChangeSuccessful(true);
                        }}
                        size="large"
                    >
                        Submit Verification Code
                    </Button>
                </Stack>
                <Modal
                    open={isPasswordChangeSuccessful}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Text in a modal
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                        </Typography>
                    </Box>
                </Modal>
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
                    minHeight: "98vh",
                    p: 1,
                }}
            >
                {!isVerificationCodeSent
                    ? sendVerificationCode(
                        email,
                        setEmail,
                        setIsVerificationCodeSent,
                        setSeconds
                    )
                    : !isVerificationCodeSubmitted
                        ? verifyCode(
                            verificationCode,
                            setVerificationCode,
                            seconds,
                            setSeconds,
                            resendAttempts,
                            setResendAttempts,
                            email,
                            setIsVerificationCodeSubmitted
                        )
                        : changePassword(
                            email,
                            verificationCode,
                            password,
                            setPassword,
                            confirmPassword,
                            setConfirmPassword,
                            isPasswordChangeSuccessful,
                            setIsPasswordChangeSuccessful
                        )}
            </Box>
        </Box>
    );
};

export default ForgotPassword;
