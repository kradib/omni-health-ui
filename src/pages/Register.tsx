import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import { useState } from "react";
import {
    BLOOD_GROUP_TYPES,
    GENDER_OPTIONS,
    RouteConstants,
} from "../Constants";
import { signupUser } from "../api/user";
import { useNavigate } from "react-router-dom";
import Toast from "../components/Toast";
import { useForm } from "react-hook-form";
import FormInput from "../components/FormInput";

export const REDIRECT_TIMEOUT = 2000;

const Register = () => {
    const {
        control,
        handleSubmit,
        formState: { isValid },
    } = useForm({ mode: "onChange" });

    const [openToast, setOpenToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [toastSeverity, setToastSeverity] = useState<"success" | "error">(
        "success"
    );
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleRegisterUser = async (userDetails: any) => {
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

                        <FormInput
                            control={control}
                            rules={{ required: "Username is required" }}
                            name="username"
                            label="Username"
                        />

                        <FormInput
                            control={control}
                            rules={{ required: "Password is required" }}
                            name="password"
                            label="Password"
                            type="password"
                        />

                        <FormInput
                            control={control}
                            rules={{ required: "First name is required" }}
                            name="firstName"
                            label="First Name"
                        />

                        <FormInput
                            control={control}
                            rules={{ required: "Last name is required" }}
                            name="lastName"
                            label="Last Name"
                        />

                        <FormInput
                            control={control}
                            rules={{ required: "Gender is required" }}
                            name="gender"
                            label="Gender"
                            type="options"
                            options={GENDER_OPTIONS}
                        />

                        <FormInput
                            control={control}
                            rules={{
                                required: "Email id is required",
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: "Invalid email address",
                                },
                            }}
                            name="email"
                            label="Email ID"
                        />

                        <FormInput
                            control={control}
                            rules={{
                                required: "Phone number is required",
                                pattern: {
                                    value: /^\+?[1-9]\d{1,14}$/,
                                    message: "Invalid phone number format",
                                },
                                minLength: {
                                    value: 10,
                                    message: "Phone number must be at least 10 digits",
                                },
                                maxLength: {
                                    value: 15,
                                    message: "Phone number must be at most 15 digits",
                                },
                            }}
                            name="phoneNumber"
                            label="Phone Number"
                        />
                        <FormInput
                            control={control}
                            rules={{ required: "Date of Birth is required" }}
                            name="dateOfBirth"
                            label="Date Of Birth"
                            type="date"
                        />
                        <FormInput
                            control={control}
                            rules={{}}
                            name="bloodGroup"
                            label="Blood Group"
                            type="options"
                            options={BLOOD_GROUP_TYPES}
                        />
                        <FormInput
                            control={control}
                            rules={{
                                type: "number",
                                min: {
                                    value: 50,
                                    message: "Height must be at least 50 cm",
                                },
                                max: {
                                    value: 300,
                                    message: "Height must be at most 300 cm",
                                },
                                validate: (value: any) =>
                                    !value ||
                                    Number.isInteger(Number(value)) ||
                                    "Must be a whole number",
                            }}
                            type="number"
                            name="height"
                            label="Height (in cm)"
                        />
                        <FormInput
                            control={control}
                            rules={{
                                type: "number",
                                min: {
                                    value: 10,
                                    message: "Weight must be at least 10 kg",
                                },
                                max: {
                                    value: 500,
                                    message: "Weight must be at most 500 kg",
                                },
                            }}
                            type="number"
                            name="weight"
                            label="Weight (in kg)"
                        />
                        <FormInput
                            control={control}
                            rules={{}}
                            name="firstGuardianUserId"
                            label="First Guardian User ID"
                        />

                        <FormInput
                            control={control}
                            rules={{}}
                            name="secondGuardianUserId"
                            label="Second Guardian User ID"
                        />

                        <Button
                            variant="contained"
                            disabled={!isValid}
                            onClick={handleSubmit(handleRegisterUser)}
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
