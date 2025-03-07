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
import { APPOINTMENT_MODE_OWN } from "../Constants";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";

interface ViewAppointmentModalProps {
    show: boolean;
    mode: string;
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
    mode,
    appointmentId,
    handleClose,
}) => {
    const theme = useTheme();

    const [appointment, setAppointment] = useState<any>({});
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

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

    const title =
        mode == APPOINTMENT_MODE_OWN
            ? `Your Appointment Details`
            : `${appointment.userDetail?.firstName} ${appointment.userDetail?.lastName}'s Appointment Details`;

    return (
        <>
            <ModalComponent open={show} onClose={handleClose} title={title}>
                {loading && <LoadingComponent isLoading={loading} />}
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
                    <Typography variant="body1">{`${appointment.doctorDetail?.firstName} ${appointment.doctorDetail?.lastName}`}</Typography>
                </Stack>

                <Stack
                    sx={{ justifyContent: "left", alignItems: "center" }}
                    direction="row"
                    spacing={2}
                >
                    <LocationOnOutlinedIcon />
                    <Typography variant="body1">
                        {appointment.doctorDetail?.location}
                    </Typography>
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
                            !!appointment.prescription?.length ||
                            "There is no prescription added by the doctor"
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
