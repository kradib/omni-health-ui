import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import dayjs from "dayjs";
import Button from "@mui/material/Button";
import { cancelAppointment } from "../api/appointment";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
interface IAppointmentCardProps {
    appointment: any;
    onCancel?: any;
    onReschedule?: any;
}

const cardStyle = {
    bgcolor: "background.paper",
    borderRadius: "10px",
    boxShadow: 2,
    p: 2,
};

const statusStyle = {
    bgcolor: "background.paper",
    borderRadius: "5px",
    border: "1px solid",
    p: 0.5,
};

const UPCOMING_APPOINTMENT_STATUS = "Upcoming";
const COMPLETED_APPOINTMENT_STATUS = "Completed";
const CANCELLED_APPOINTMENT_STATUS = "Cancelled";

const getAppointmentStatus: any = (appointment: any) => {
    if (appointment.status == 2) {
        return {
            appointmentStatus: CANCELLED_APPOINTMENT_STATUS,
            statusColor: "#cf2b2b",
        };
    }
    if (dayjs(appointment.appointmentDateTime).isBefore(dayjs(), "day")) {
        return {
            appointmentStatus: COMPLETED_APPOINTMENT_STATUS,
            statusColor: "#1bd176",
        };
    }
    return {
        appointmentStatus: UPCOMING_APPOINTMENT_STATUS,
        statusColor: "#1b91d1",
    };
};

const AppointmentCard: React.FC<IAppointmentCardProps> = ({
    appointment,
    onCancel,
}) => {
    const { appointmentStatus, statusColor } = getAppointmentStatus(appointment);
    const [cancellationConfirmation, setCancellationConfirmation] =
        useState(false);

    const handleCancel = async () => {
        const response = await cancelAppointment(appointment.id);
        onCancel(response.data, response.success ? "success" : "error");
        setCancellationConfirmation(false);
    };

    const handleClose = () => {
        setCancellationConfirmation(false);
    };

    const cancellationConfirmationDialog = () => {
        return (
            <Dialog
                open={cancellationConfirmation}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to cancel your appointment?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>No</Button>
                    <Button onClick={handleCancel} autoFocus>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        );
    };

    return (
        <>
            <Box sx={cardStyle}>
                <Stack spacing={2}>
                    <Stack
                        sx={{ justifyContent: "space-between", alignItems: "center" }}
                        direction="row"
                    >
                        <Typography variant="h2">{appointment.doctorName}</Typography>
                        <Box
                            sx={{
                                ...statusStyle,
                                color: statusColor,
                                borderColor: statusColor,
                            }}
                        >
                            <Typography variant="body2">{appointmentStatus}</Typography>
                        </Box>
                    </Stack>
                    <Box
                        sx={{
                            bgcolor: "#e1e7eb",
                            borderRadius: "5px",
                            p: 2,
                        }}
                    >
                        <Stack
                            sx={{ justifyContent: "left", alignItems: "center", mb: 1 }}
                            direction="row"
                            spacing={2}
                        >
                            <CalendarMonthIcon />
                            <Typography variant="body2">
                                {dayjs(appointment.appointmentDateTime).format(
                                    "dddd, D MMMM, YYYY"
                                )}
                            </Typography>
                        </Stack>
                        <Stack
                            sx={{ justifyContent: "left", alignItems: "center" }}
                            direction="row"
                            spacing={2}
                        >
                            <AccessTimeIcon />
                            <Typography variant="body2">
                                {dayjs(appointment.appointmentDateTime).format("h:mm A")}
                            </Typography>
                        </Stack>
                    </Box>

                    <Stack
                        sx={{ justifyContent: "left", alignItems: "center" }}
                        direction="row"
                        spacing={2}
                    >
                        <Button
                            disabled={appointmentStatus != UPCOMING_APPOINTMENT_STATUS}
                            variant="outlined"
                            onClick={() => setCancellationConfirmation(true)}
                        >
                            Cancel
                        </Button>
                        <Button
                            disabled={appointmentStatus != UPCOMING_APPOINTMENT_STATUS}
                            variant="contained"
                        >
                            Reschedule
                        </Button>
                    </Stack>
                </Stack>
            </Box>
            {cancellationConfirmationDialog()}
        </>
    );
};

export default AppointmentCard;
