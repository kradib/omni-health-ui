import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import React, { useState } from "react";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { IAppointmentDetails } from "../interface/IAppointmentDetails";
import { createAppointment } from "../api/appointment";

interface CreateAppointmentModalProps {
    show: boolean;
    handleCreated: any;
    handleClose: any;
}

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    borderRadius: "10px",
    boxShadow: 24,
    p: 4,
};

const isValidInput = (appointmentDetails: IAppointmentDetails) => {
    return (
        appointmentDetails.appointmentDateTime.length > 0 &&
        appointmentDetails.appointmentPlace.length > 0 &&
        appointmentDetails.doctorName.length > 0
    );
};

const CreateAppointmentModal: React.FC<CreateAppointmentModalProps> = ({
    show,
    handleCreated,
    handleClose
}) => {
    const [appointment, setAppointment] = useState({
        appointmentDateTime: "",
        appointmentPlace: "",
        doctorName: "",
    });
    const [isLoading, setLoading] = useState(false);

    const handleCreateAppointment = async () => {
        setLoading(true);
        const response = await createAppointment(appointment);
        setLoading(false);
        handleCreated(response.data, response.success ? "success" : "error");
    };

    return (
        <>
            <Modal
                open={show}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Stack spacing={2}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Create Appointment
                        </Typography>

                        <TextField
                            id="appointmentDateTime"
                            label="Appointment Date Time"
                            onChange={(e) =>
                                setAppointment({
                                    ...appointment,
                                    appointmentDateTime: e.target.value,
                                })
                            }
                            variant="outlined"
                            value={appointment.appointmentDateTime}
                        />
                        <TextField
                            id="appointmentPlace"
                            label="Appointment Place"
                            onChange={(e) =>
                                setAppointment({
                                    ...appointment,
                                    appointmentPlace: e.target.value,
                                })
                            }
                            variant="outlined"
                            value={appointment.appointmentPlace}
                        />
                        <TextField
                            id="doctorName"
                            label="Doctor Name"
                            onChange={(e) =>
                                setAppointment({
                                    ...appointment,
                                    doctorName: e.target.value,
                                })
                            }
                            variant="outlined"
                            value={appointment.doctorName}
                        />
                        <Button
                            variant="contained"
                            disabled={!isValidInput(appointment)}
                            onClick={handleCreateAppointment}
                            size="large"
                            loading={isLoading}
                        >
                            Create Appointment
                        </Button>
                    </Stack>
                </Box>
            </Modal>
        </>
    );
};

export default CreateAppointmentModal;
