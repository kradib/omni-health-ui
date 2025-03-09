import React, { useState } from "react";
import ModalComponent from "./ModalComponent";
import { getUserDetailFromLocalStorage } from "../utils/Utils";
import Button from "@mui/material/Button";
import { updateUser } from "../api/user";
import { useForm } from "react-hook-form";
import FormInput from "./FormInput";
import { USER_DETAILS_KEY } from "../Constants";
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
    const defaultUserDetails = getUserDetailFromLocalStorage();
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
        localStorage.setItem(
            USER_DETAILS_KEY,
            JSON.stringify(response.data.userDetails)
        );
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
