import { useEffect, useState } from "react";
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

const AppointmentsGridComponent = ({
    title,
    mode,
}: {
    title: string;
    mode: string;
}) => {
    const [openToast, setOpenToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [toastSeverity, setToastSeverity] = useState<"success" | "error">(
        "success"
    );
    const [isAppointmentListEmpty, setIsAppointmentListEmpty] = useState(false);
    const [loading, setLoading] = useState(false);
    const [pageLimit, setPageLimit] = useState(0);
    const [appointmentParams, setAppointmentParams] =
        useState<IGetAppointmentsParams>({
            status: undefined,
            page: 0,
            size: DEFAULT_PAGE_SIZE,
        });

    const [appointmentList, setAppointmentList] = useState([]);

    const getAppointmentList = async () => {
        setLoading(true);
        const response = await getAppointments(appointmentParams, mode);
        setLoading(false);
        let appointmentList = [];
        if (response.success) {
            appointmentList = response.data?.data.appointments;
        }
        if (!appointmentList || appointmentList.length === 0) {
            setIsAppointmentListEmpty(true);
            return;
        }
        setIsAppointmentListEmpty(false);
        setPageLimit(response.data?.data.totalPages);
        setAppointmentList(appointmentList);
    };

    useEffect(() => {
        getAppointmentList();
    }, [appointmentParams]);

    const handleAppointmentUpdated = (
        message: string,
        severity: "success" | "error"
    ) => {
        setToastMessage(message);
        setToastSeverity(severity);
        setOpenToast(true);
        getAppointmentList();
    };

    const searchAndFilter = () => {
        return (
            <>
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <Tabs
                        centered
                        value={appointmentParams.status || "all"}
                        onChange={(_event: React.SyntheticEvent, newValue: any) => {
                            if (newValue == "all") {
                                setAppointmentParams({
                                    ...appointmentParams,
                                    status: undefined,
                                });
                                return;
                            }
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
                        <Tab label="Confirmed" value="confirmed" />
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
                    {appointmentList.map((appointment: any) => (
                        <Grid key={appointment.id} size={{ xs: 12, md: 6, lg: 4 }}>
                            <AppointmentCard
                                appointment={appointment}
                                mode={mode}
                                onCancel={handleAppointmentUpdated}
                                onReschedule={handleAppointmentUpdated}
                            />
                        </Grid>
                    ))}
                </Grid>
                <Box sx={{ justifyItems: "center" }}>
                    <Pagination
                        count={pageLimit}
                        color="primary"
                        onChange={(_event, page) =>
                            setAppointmentParams({ ...appointmentParams, page: page - 1 })
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

    const appointmentsGridComponent = () => {
        return (
            <>
                <Stack spacing={2}>
                    {searchAndFilter()}
                    {isAppointmentListEmpty ? noAppointmentsMessage() : appointmentGrid()}
                </Stack>
            </>
        );
    };

    return (
        <>
            <Typography variant="h5" sx={{ mb: 2 }}>
                {title}
            </Typography>
            <LoadingComponent isLoading={loading} />
            {appointmentsGridComponent()}
            <Toast
                open={openToast}
                severity={toastSeverity}
                message={toastMessage}
                onClose={() => setOpenToast(false)}
            />
        </>
    );
};

export default AppointmentsGridComponent;
