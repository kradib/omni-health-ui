import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import { useState } from "react";
import { IUserDetails } from "../interface/IUserDetails";
import { validateEmail } from "../utils/Utils";
import { RouteConstants } from "../Constants";
import { signupUser } from "../api/user";
import { useNavigate } from "react-router-dom";
import Toast from "../components/Toast";
import PasswordField from "../components/PasswordField";

export const REDIRECT_TIMEOUT = 2000;

const Register = () => {
    const [userDetails, setUserDetails] = useState<IUserDetails>({
        username: "",
        password: "",
        firstName: "",
        lastName: "",
        emailId: "",
        phoneNumber: "",
        firstGuardianUserId: "",
        secondGuardianUserId: "",
    });
    const [openToast, setOpenToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [toastSeverity, setToastSeverity] = useState<"success" | "error">(
        "success"
    );
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    function isValidInput(userDetails: IUserDetails) {
        return (
            userDetails.username.length > 0 &&
            userDetails.password.length > 0 &&
            userDetails.firstName.length > 0 &&
            userDetails.lastName.length > 0 &&
            userDetails.emailId.length > 0 &&
            validateEmail(userDetails.emailId) &&
            userDetails.phoneNumber.length > 0
        );
    }

    const handleRegisterUser = async (userDetails: IUserDetails) => {
        setLoading(true);
        const response = await signupUser(userDetails);
        setLoading(false);

        setToastMessage(response.data);
        setToastSeverity(response.success ? "success" : "error");
        setOpenToast(true);

        if (response.success) {
            setTimeout(() => {
                navigate(`/${RouteConstants.LOGIN_ROUTE}`);
            }, REDIRECT_TIMEOUT);
        } else {
            setToastSeverity("error");
        }
    };

    const handleCloseSnackbar = () => {
        setOpenToast(false);
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
                        alignContent: "center",
                        minHeight: "98vh",
                        p: 1,
                    }}
                >
                    <Stack spacing={2}>
                        <Typography variant="h4">Create Your Account</Typography>
                        <Typography variant="subtitle1">
                            To get started, please create your account by filling out the
                            details
                        </Typography>

                        <TextField
                            id="username"
                            label="Username"
                            required
                            onChange={(e) =>
                                setUserDetails({ ...userDetails, username: e.target.value })
                            }
                            variant="outlined"
                            value={userDetails.username}
                        />

                        <PasswordField
                            id="password"
                            label="Password"
                            onChange={(e: any) =>
                                setUserDetails({ ...userDetails, password: e.target.value })
                            }
                            value={userDetails.password}
                        />

                        <TextField
                            id="firstName"
                            label="First Name"
                            required
                            onChange={(e) =>
                                setUserDetails({ ...userDetails, firstName: e.target.value })
                            }
                            variant="outlined"
                            value={userDetails.firstName}
                        />

                        <TextField
                            id="lastName"
                            label="Last Name"
                            required
                            onChange={(e) =>
                                setUserDetails({ ...userDetails, lastName: e.target.value })
                            }
                            variant="outlined"
                            value={userDetails.lastName}
                        />

                        <TextField
                            id="emailId"
                            label="Email ID"
                            type="email"
                            required
                            onChange={(e) =>
                                setUserDetails({ ...userDetails, emailId: e.target.value })
                            }
                            variant="outlined"
                            value={userDetails.emailId}
                        />

                        <TextField
                            id="phoneNumber"
                            label="Phone Number"
                            required
                            onChange={(e) =>
                                setUserDetails({ ...userDetails, phoneNumber: e.target.value })
                            }
                            variant="outlined"
                            value={userDetails.phoneNumber}
                        />

                        <TextField
                            id="firstGuardianUserId"
                            label="First Guardian User ID"
                            onChange={(e) =>
                                setUserDetails({
                                    ...userDetails,
                                    firstGuardianUserId: e.target.value,
                                })
                            }
                            variant="outlined"
                            value={userDetails.firstGuardianUserId}
                        />

                        <TextField
                            id="secondGuardianUserId"
                            label="Second Guardian User ID"
                            onChange={(e) =>
                                setUserDetails({
                                    ...userDetails,
                                    secondGuardianUserId: e.target.value,
                                })
                            }
                            variant="outlined"
                            value={userDetails.secondGuardianUserId}
                        />

                        <Button
                            variant="contained"
                            disabled={!isValidInput(userDetails)}
                            onClick={() => handleRegisterUser(userDetails)}
                            size="large"
                            loading={loading}
                        >
                            Register
                        </Button>
                    </Stack>

                    <Toast
                        open={openToast}
                        severity={toastSeverity}
                        message={toastMessage}
                        onClose={handleCloseSnackbar}
                    />

                    <div>
                        <Typography align="center" variant="subtitle1">
                            By registering you agree to
                        </Typography>
                        <Typography align="center" variant="subtitle1">
                            <Link href="#" underline="none">
                                Terms and Conditions
                            </Link>{" "}
                            and{" "}
                            <Link href="#" underline="none">
                                Privacy Policy
                            </Link>
                        </Typography>
                        <Typography align="center" variant="subtitle1">
                            Already have an account?{" "}
                            <Link href={RouteConstants.LOGIN_ROUTE} underline="none">
                                Sign In
                            </Link>
                        </Typography>
                    </div>
                </Box>
            </Box>
        </>
    );
};

export default Register;
