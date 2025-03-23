import React, { useState } from "react";
import ModalComponent from "./ModalComponent";
import { getUserDetailFromLocalStorage } from "../utils/Utils";
import Button from "@mui/material/Button";
import { updateUser } from "../api/user";
import { useForm } from "react-hook-form";
import FormInput from "./FormInput";
import { GENDER_OPTIONS, USER_DETAILS_KEY } from "../Constants";
import dayjs from "dayjs";
interface UpdateProfileModalProps {
    show: boolean;
    onUpdated: any;
    onClose: any;
}

const UpdateProfileModal: React.FC<UpdateProfileModalProps> = ({
    show,
    onUpdated,
    onClose,
}) => {
    const userDetails = getUserDetailFromLocalStorage();
    const defaultUserDetails = {
        ...userDetails,
        dateOfBirth: dayjs(userDetails.dateOfBirth),
    };
    const {
        control,
        handleSubmit,
        formState: { isValid },
    } = useForm({ mode: "onChange", defaultValues: defaultUserDetails });

    const [loading, setLoading] = useState(false);

    const handleUpdate = async (data: any) => {
        setLoading(true);
        const response = await updateUser(data);
        setLoading(false);
        if (response.success) {
            localStorage.setItem(
                USER_DETAILS_KEY,
                JSON.stringify(response.data.userDetails)
            );
        }
        onUpdated(response.data.message, response.success ? "success" : "error");
    };

    return (
        <>
            <ModalComponent
                open={show}
                onClose={onClose}
                title={"Update Profile"}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
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
                    disabled
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
                    disabled
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
                    name="bloodGroup"
                    label="Blood Group"
                    disabled
                />

                <FormInput
                    control={control}
                    disabled={!!defaultUserDetails.firstGuardianUserId?.length}
                    rules={{}}
                    name="firstGuardianUserId"
                    label="First Guardian User ID"
                />

                <FormInput
                    control={control}
                    disabled={!!defaultUserDetails.secondGuardianUserId?.length}
                    rules={{}}
                    name="secondGuardianUserId"
                    label="Second Guardian User ID"
                />

                <Button
                    variant="contained"
                    disabled={!isValid}
                    onClick={handleSubmit(handleUpdate)}
                    size="large"
                    loading={loading}
                >
                    Update Profile
                </Button>
            </ModalComponent>
        </>
    );
};

export default UpdateProfileModal;
