import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import { useState } from "react";
import { IUserDetails } from "../interface/IUserDetails";
import { validateEmail } from "../utils/Utils";
import { RouteConstants, SNACKBAR_TIMEOUT } from "../Constants";
import { signupUser } from "../api/user";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

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
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
        "success"
    );
    const [isLoading, setLoading] = useState(false);
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

        setSnackbarMessage(response.data);
        setSnackbarSeverity(response.success ? "success" : "error");
        setOpenSnackbar(true);

        if (response.success) {
            setTimeout(() => {
                navigate(`/${RouteConstants.LOGIN_ROUTE}`);
            }, REDIRECT_TIMEOUT);
        } else {
            setSnackbarSeverity("error");
        }
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

                        <TextField
                            id="password"
                            type="password"
                            label="Password"
                            required
                            onChange={(e) =>
                                setUserDetails({ ...userDetails, password: e.target.value })
                            }
                            variant="outlined"
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

                        {!isLoading && (
                            <Button
                                variant="contained"
                                disabled={!isValidInput(userDetails)}
                                onClick={() => handleRegisterUser(userDetails)}
                                size="large"
                            >
                                Register
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

                    {/* Snackbar to show success or error message */}
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
