import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

interface PasswordFieldProps {
    id: string;
    value?: String;
    label?: String;
    onChange?: any;
    error?: any;
}

const PasswordField: React.FC<PasswordFieldProps> = (props) => {
    const [showPassword, setShowPassword] = useState(false);
    const handleTogglePassword = () => setShowPassword((prev) => !prev);

    return (
        <TextField
            id={props.id}
            type={showPassword ? "text" : "password"}
            label={props.label}
            onChange={props.onChange}
            variant="outlined"
            value={props.value}
            slotProps={{
                input: {
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={handleTogglePassword} edge="end">
                                {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                            </IconButton>
                        </InputAdornment>
                    ),
                },
            }}
            error={!!props.error}
            helperText={props.error?.message}
            required
        />
    );
};

export default PasswordField;
