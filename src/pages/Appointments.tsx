import AddIcon from "@mui/icons-material/Add";
import { useTheme } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import { useEffect, useState } from "react";
import CreateAppointmentModal from "../components/CreateAppointmentModal";
import Toast from "../components/Toast";
import Typography from "@mui/material/Typography";
import { getAppointments } from "../api/appointment";
import LoadingComponent from "../components/LoadingComponent";
import AppointmentCard from "../components/AppointmentCard";
import Grid from "@mui/material/Grid2";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DATE_TIME_FORMAT } from "../Constants";
import dayjs from "dayjs";
import { IGetAppointmentsParams } from "../interface/IGetAppointmentsParams";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
const DEFAULT_PAGE_SIZE = 6;

const Appointments = () => {
    const theme = useTheme();
    const [showAddModal, setShowAddModal] = useState(false);

    const [openToast, setOpenToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [toastSeverity, setToastSeverity] = useState<"success" | "error">(
        "success"
    );
    const [isOwnAppointmentsEmpty, setIsOwnAppointmentsEmpty] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [pageLimit, setPageLimit] = useState(0);
    const [appointmentParams, setAppointmentParams] =
        useState<IGetAppointmentsParams>({
            status: "all",
            page: 1,
            size: DEFAULT_PAGE_SIZE,
        });

    const handleCloseSnackbar = () => {
        setOpenToast(false);
    };

    const [ownAppointments, setOwnAppointments] = useState([]);

    const getAppointmentList = async () => {
        setLoading(true);
        const response = await getAppointments(appointmentParams);
        setLoading(false);
        let ownAppointmentList = [];
        if (response.success) {
            ownAppointmentList = response.data?.data.ownAppointments;
        }
        if (!ownAppointmentList || ownAppointmentList.length === 0) {
            setIsOwnAppointmentsEmpty(true);
            return;
        }
        setIsOwnAppointmentsEmpty(false);
        setPageLimit(response.data?.data.totalPages);
        setOwnAppointments(ownAppointmentList);
    };

    useEffect(() => {
        getAppointmentList();
    }, [appointmentParams]);

    const handleCreated = (message: string, severity: "success" | "error") => {
        setToastMessage(message);
        setToastSeverity(severity);
        setOpenToast(true);
        setShowAddModal(false);
        getAppointmentList();
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

    const searchAndFilter = () => {
        return (
            <>
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <Tabs
                        centered
                        value={appointmentParams.status}
                        onChange={(_event: React.SyntheticEvent, newValue: any) => {
                            setAppointmentParams({
                                ...appointmentParams,
                                status: newValue,
                            });
                        }}
                        sx={{
                            width: "100%", // Set the desired width
                            maxWidth: { xs: "100vw", md: "400px" }, // Optional: Limit max width
                        }}
                    >
                        <Tab label="All" value="all" />
                        <Tab label="Upcoming" value="upcoming" />
                        <Tab label="Completed" value="completed" />
                        <Tab label="Cancelled" value="cancelled" />
                    </Tabs>
                </Box>

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Stack spacing={2} direction="row">
                        <DateTimePicker
                            label="Start Date & Time"
                            value={
                                appointmentParams.startDate
                                    ? dayjs(appointmentParams.startDate, DATE_TIME_FORMAT)
                                    : null
                            }
                            onChange={(newValue) =>
                                setAppointmentParams({
                                    ...appointmentParams,
                                    startDate: newValue
                                        ? newValue.format(DATE_TIME_FORMAT)
                                        : dayjs().format(DATE_TIME_FORMAT),
                                })
                            }
                        />

                        <DateTimePicker
                            label="End Date & Time"
                            value={
                                appointmentParams.endDate
                                    ? dayjs(appointmentParams.endDate, DATE_TIME_FORMAT)
                                    : null
                            }
                            onChange={(newValue) =>
                                setAppointmentParams({
                                    ...appointmentParams,
                                    endDate: newValue
                                        ? newValue.format(DATE_TIME_FORMAT)
                                        : dayjs().format(DATE_TIME_FORMAT),
                                })
                            }
                            minDateTime={dayjs(appointmentParams.startDate, DATE_TIME_FORMAT)} // Prevent end date from being before start date
                        />
                    </Stack>
                </LocalizationProvider>
            </>
        );
    };

    const appointmentGrid = () => {
        return (
            <>
                <Grid container sx={{ marginTop: 2, alignItems: "center" }} spacing={2}>
                    {ownAppointments.map((appointment: any) => (
                        <Grid key={appointment.id} size={{ xs: 12, md: 4 }}>
                            <AppointmentCard
                                appointment={appointment}
                                onCancel={handleCreated}
                                onReschedule={handleCreated}
                            />
                        </Grid>
                    ))}
                </Grid>
                <Box sx={{ justifyItems: "center" }}>
                    <Pagination
                        count={pageLimit}
                        color="primary"
                        onChange={(_event, page) =>
                            setAppointmentParams({ ...appointmentParams, page: page })
                        }
                    />
                </Box>
            </>
        );
    };

    const noAppointmentsMessage = () => {
        return (
            <>
                <Typography variant="h6" sx={{ textAlign: "center" }}>
                    You have no appointments for the selected dates
                </Typography>
            </>
        );
    };

    const ownAppointmentsComponent = () => {
        return (
            <>
                <Stack spacing={2}>
                    {searchAndFilter()}
                    {isOwnAppointmentsEmpty ? noAppointmentsMessage() : appointmentGrid()}
                </Stack>
            </>
        );
    };

    return (
        <>
            {createAppointment()}
            <Typography variant="h5" sx={{ mb: 2 }}>
                My Appointments
            </Typography>
            <LoadingComponent isLoading={isLoading} />
            {ownAppointmentsComponent()}
        </>
    );
};

export default Appointments;
