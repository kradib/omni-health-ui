import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import { useState } from "react";
const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

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
                                <Link href="#" underline="none">
                                    Forgot Password?
                                </Link>
                            </Typography>
                        </Box>

                        <Button
                            variant="contained"
                            disabled={!(username.length > 0 && password.length > 0)}
                            onClick={() =>
                                console.log("Username: " + username + "Password: " + password)
                            }
                            size="large"
                        >
                            Sign In
                        </Button>
                    </Stack>

                    <div>
                        <Typography variant="subtitle1">
                            Not yet registered?{" "}
                            <Link href="/register" underline="none">
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
