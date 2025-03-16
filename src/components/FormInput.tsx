import TextField from "@mui/material/TextField";
import React from "react";
import { Controller } from "react-hook-form";
import PasswordField from "./PasswordField";
import Autocomplete from "@mui/material/Autocomplete";
import { DATE_FORMAT } from "../Constants";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
interface FormInputProps {
    control: any;
    rules: any;
    name: string;
    label: string;
    type?: string;
    disabled?: boolean;
    options?: any;
}

const FormInput: React.FC<FormInputProps> = ({
    control,
    rules,
    name,
    label,
    type,
    disabled,
    options,
}) => {
    return (
        <Controller
            name={name}
            control={control}
            rules={rules}
            render={({ field, fieldState }) => {
                switch (type) {
                    case "password":
                        return (
                            <PasswordField
                                {...field}
                                id={name}
                                label={label}
                                error={fieldState.error}
                                value={field.value ?? ""}
                            />
                        );
                    case "options":
                        return (
                            <Autocomplete
                                {...field}
                                id={name}
                                options={options}
                                onChange={(_, newValue) => field.onChange(newValue)}
                                renderInput={(params) => (
                                    <TextField
                                        {...field}
                                        {...params}
                                        label={label}
                                        variant="outlined"
                                    />
                                )}
                                value={field.value}
                            />
                        );
                    case "date":
                        return (
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    {...field}
                                    label={label}
                                    value={field.value}
                                    format={DATE_FORMAT}
                                    slotProps={{
                                        textField: {
                                            ...field,
                                            required: rules.required,
                                            error: !!fieldState.error,
                                            helperText: fieldState.error?.message || "",
                                        },
                                    }}
                                />
                            </LocalizationProvider>
                        );
                    default:
                        return (
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
                                type={type ?? "text"}
                            />
                        );
                }
            }}
        />
    );
};

export default FormInput;
