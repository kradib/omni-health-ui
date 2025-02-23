import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import React, { useState } from "react";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { IAppointmentDetails } from "../interface/IAppointmentDetails";
import { createAppointment } from "../api/appointment";
import TimeSlotPicker from "./AppointmentSlotPicker";
import dayjs from "dayjs";
import { DATE_FORMAT, DATE_TIME_FORMAT, TIME_INPUT_FORMAT } from "../Constants";

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
    handleClose,
}) => {
    const initialAppointmentState = {
        appointmentDateTime: "",
        appointmentPlace: "",
        doctorName: "",
    };

    const [appointment, setAppointment] = useState(initialAppointmentState);
    const [isLoading, setLoading] = useState(false);
    const [pageNumber, setPageNumber] = useState(1);

    const handleCreateAppointment = async () => {
        setLoading(true);
        const response = await createAppointment(appointment);
        setLoading(false);
        setAppointment(initialAppointmentState);
        setPageNumber(1);
        handleCreated(response.data, response.success ? "success" : "error");
    };

    const handleTimeChange = (time: string, date: any) => {
        const finalDate = dayjs(
            `${date.format(DATE_FORMAT)} ${time}`,
            `${DATE_FORMAT} ${TIME_INPUT_FORMAT}`
        ).format(DATE_TIME_FORMAT);
        console.log(finalDate);
        setAppointment({ ...appointment, appointmentDateTime: finalDate });
    };

    const timeSlot = () => {
        return <TimeSlotPicker onChange={handleTimeChange} />;
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
                            New Appointment
                        </Typography>

                        {pageNumber == 1 && (
                            <>
                                {timeSlot()}
                                <Button
                                    variant="contained"
                                    disabled={appointment.appointmentDateTime.length == 0}
                                    onClick={() => setPageNumber(2)}
                                    size="large"
                                >
                                    Next
                                </Button>
                            </>
                        )}

                        {pageNumber == 2 && (
                            <>
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
                                <Stack direction="row" spacing={2}>
                                    <Button
                                        variant="outlined"
                                        onClick={() => setPageNumber(1)}
                                        size="large"
                                        sx={{ flex: 1 }}
                                    >
                                        Go back
                                    </Button>
                                    <Button
                                        variant="contained"
                                        disabled={!isValidInput(appointment)}
                                        onClick={handleCreateAppointment}
                                        size="large"
                                        loading={isLoading}
                                        sx={{ flex: 1 }}
                                    >
                                        Create Appointment
                                    </Button>
                                </Stack>
                            </>
                        )}
                    </Stack>
                </Box>
            </Modal>
        </>
    );
};

export default CreateAppointmentModal;
