import AddIcon from "@mui/icons-material/Add";
import { useTheme } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import { useState } from "react";
import CreateAppointmentModal from "../components/CreateAppointmentModal";
import Toast from "../components/Toast";
import AppointmentsGridComponent from "../components/AppointmentGridComponent";

const Appointments = () => {
    const theme = useTheme();
    const [showAddModal, setShowAddModal] = useState(false);
    const [appointmentsChanged, setAppointmentsChanged] = useState(0);

    const [openToast, setOpenToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [toastSeverity, setToastSeverity] = useState<"success" | "error">(
        "success"
    );

    const handleCloseSnackbar = () => {
        setOpenToast(false);
    };

    const handleCreated = (message: string, severity: "success" | "error") => {
        setToastMessage(message);
        setToastSeverity(severity);
        setOpenToast(true);
        setShowAddModal(false);
        setAppointmentsChanged(appointmentsChanged + 1);
    };

    const handleClose = () => {
        setShowAddModal(false);
    };

    const createAppointment = () => {
        return (
            <>
                <IconButton
                    sx={{
                        backgroundColor: theme.palette.primary.main,
                        color: "#ffffff",
                        borderRadius: "50%",
                        position: "fixed", // Fixed position
                        bottom: 20, // Distance from the bottom
                        right: 20, // Distance from the right
                        width: 56,
                        height: 56,
                        boxShadow: 2,
                        "&:hover": {
                            backgroundColor: theme.palette.primary.light,
                        },
                    }}
                    onClick={() => setShowAddModal(true)}
                >
                    <AddIcon />
                </IconButton>

                <Toast
                    open={openToast}
                    severity={toastSeverity}
                    message={toastMessage}
                    onClose={handleCloseSnackbar}
                />

                {showAddModal && (
                    <CreateAppointmentModal
                        show={showAddModal}
                        handleCreated={handleCreated}
                        handleClose={handleClose}
                    />
                )}
            </>
        );
    };

    return (
        <>
            {createAppointment()}
            <AppointmentsGridComponent
                key={appointmentsChanged}
                title="My Appointments"
            />
        </>
    );
};

export default Appointments;
