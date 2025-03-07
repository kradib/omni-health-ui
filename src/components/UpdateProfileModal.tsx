import React, { useState } from "react";
import ModalComponent from "./ModalComponent";
import { getUserDetailFromLocalStorage, validateEmail } from "../utils/Utils";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { updateUser } from "../api/user";
interface UpdateProfileModalProps {
    show: boolean;
    onUpdated: any;
    onClose: any;
}

function isValidInput(userDetails: any) {
    return (
        userDetails.firstName.length > 0 &&
        userDetails.lastName.length > 0 &&
        userDetails.email.length > 0 &&
        validateEmail(userDetails.email) &&
        userDetails.phoneNumber.length > 0
    );
}

const UpdateProfileModal: React.FC<UpdateProfileModalProps> = ({
    show,
    onUpdated,
    onClose,
}) => {
    const defaultUserDetails = getUserDetailFromLocalStorage();
    const [userDetails, setUserDetails] = useState<any>(defaultUserDetails);
    const [loading, setLoading] = useState(false);

    const handleUpdate = async () => {
        setLoading(true);
        const response = await updateUser(userDetails);
        setLoading(false);
        onUpdated(response.data, response.success ? "success" : "error");
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
                <TextField
                    id="firstName"
                    label="First Name"
                    disabled
                    variant="outlined"
                    value={userDetails.firstName}
                />

                <TextField
                    id="lastName"
                    label="Last Name"
                    disabled
                    variant="outlined"
                    value={userDetails.lastName}
                />

                <TextField
                    id="emailId"
                    label="Email ID"
                    type="email"
                    required
                    onChange={(e) =>
                        setUserDetails({ ...userDetails, email: e.target.value })
                    }
                    variant="outlined"
                    value={userDetails.email}
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
                    disabled={!!defaultUserDetails.firstGuardianUserId?.length}
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
                    disabled={!!defaultUserDetails.secondGuardianUserId?.length}
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
                    onClick={handleUpdate}
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
