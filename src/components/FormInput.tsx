import TextField from "@mui/material/TextField";
import React from "react";
import { Controller } from "react-hook-form";
import PasswordField from "./PasswordField";

interface FormInputProps {
    control: any;
    rules: any;
    name: string;
    label: string;
    type?: string;
    disabled?: boolean;
}

const FormInput: React.FC<FormInputProps> = ({
    control,
    rules,
    name,
    label,
    type,
    disabled,
}) => {
    const isPasswordField = type == "password";

    return (
        <Controller
            name={name}
            control={control}
            rules={rules}
            render={({ field, fieldState }) =>
                isPasswordField ? (
                    <PasswordField
                        {...field}
                        id={name}
                        label={label}
                        error={fieldState.error}
                        value={field.value ?? ""}
                    />
                ) : (
                    <TextField
                        {...field}
                        id={name}
                        label={label}
                        variant="outlined"
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message || ""}
                        value={field.value ?? ""}
                        required={rules.required}
                        disabled={disabled}
                    />
                )
            }
        />
    );
};

export default FormInput;
