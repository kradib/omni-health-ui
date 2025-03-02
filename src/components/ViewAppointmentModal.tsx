import React, { useEffect, useState } from "react";
import ModalComponent from "./ModalComponent";
import LoadingComponent from "./LoadingComponent";
import { getAppointment } from "../api/appointment";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import dayjs from "dayjs";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { DoctorIcon } from "../icons/DoctorIcon";
import TextField from "@mui/material/TextField";
import ContentPasteOutlinedIcon from "@mui/icons-material/ContentPasteOutlined";
import { useTheme } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import DownloadIcon from "@mui/icons-material/Download";
import SpeakerNotesOutlinedIcon from "@mui/icons-material/SpeakerNotesOutlined";

interface ViewAppointmentModalProps {
    show: boolean;
    appointmentId: number;
    handleClose: any;
}

const appointmentNotesStyle = {
    color: "black",
    WebkitTextFillColor: "black",
    backgroundColor: "#ebeced",
    borderRadius: "5px",
    border: "none",
    "& .MuiOutlinedInput-notchedOutline": {
        border: "none", // Remove the border completely
    },
};

const ViewAppointmentModal: React.FC<ViewAppointmentModalProps> = ({
    show,
    appointmentId,
    handleClose,
}) => {
    const theme = useTheme();

    const [appointment, setAppointment] = useState<any>({});
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [isLoading, setLoading] = useState(false);

    const getAppointmentDetails = async () => {
        setLoading(true);
        const response = await getAppointment(appointmentId);
        setLoading(false);

        if (response.success) {
            setErrorMessage(null);
            setAppointment(response.data?.data.appointmentSchedule);
        } else {
            setErrorMessage("Error fetching appointment details");
        }
    };

    const getPrescription = () => {
        return (
            <>
                <Stack
                    sx={{ justifyContent: "space-between", alignItems: "center" }}
                    direction="row"
                    spacing={2}
                >
                    <Stack
                        sx={{ justifyContent: "left", alignItems: "center" }}
                        direction="row"
                        spacing={2}
                    >
                        <ContentPasteOutlinedIcon />
                        <Typography variant="body1">Prescription</Typography>
                    </Stack>
                    <IconButton
                        sx={{ color: theme.palette.primary.main }}
                        onClick={() => {
                            console.log(appointment.id);
                        }}
                    >
                        <DownloadIcon />
                    </IconButton>
                </Stack>
            </>
        );
    };

    useEffect(() => {
        getAppointmentDetails();
    }, []);

    return (
        <>
            <ModalComponent
                open={show}
                onClose={handleClose}
                title="Appointment Details"
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                {isLoading && <LoadingComponent isLoading={isLoading} />}
                {errorMessage && (
                    <Typography variant="h4" sx={{ color: "red" }}>
                        {errorMessage}
                    </Typography>
                )}

                <Stack
                    sx={{ justifyContent: "left", alignItems: "center", mb: 1 }}
                    direction="row"
                    spacing={2}
                >
                    <CalendarMonthIcon />
                    <Typography variant="body1">
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
                    <Typography variant="body1">
                        {dayjs(appointment.appointmentDateTime).format("h:mm A")}
                    </Typography>
                </Stack>

                <Stack
                    sx={{ justifyContent: "left", alignItems: "center" }}
                    direction="row"
                    spacing={2}
                >
                    <DoctorIcon />
                    <Typography variant="body1">{appointment.doctorName}</Typography>
                </Stack>

                <Stack spacing={1}>
                    <Stack
                        sx={{ justifyContent: "left", alignItems: "center" }}
                        direction="row"
                        spacing={2}
                    >
                        <SpeakerNotesOutlinedIcon />
                        <Typography variant="body1">Appointment Notes</Typography>
                    </Stack>

                    <TextField
                        // disabled
                        multiline
                        maxRows={10}
                        slotProps={{
                            input: {
                                readOnly: true,
                            },
                        }}
                        value={
                            !!appointment.appointmentNotes?.length ||
                            "Lorem Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
                        }
                        sx={appointmentNotesStyle}
                    />
                </Stack>
                {!!appointment.prescription?.length && getPrescription()}
            </ModalComponent>
        </>
    );
};

export default ViewAppointmentModal;
