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
    const [appointmentParams, setAppointmentParams] = useState({
        startDate: "2024-12-01T00:00:00",
        endDate: "2025-02-27T23:59:59",
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
        const ownAppointmentList = response.data?.data.ownAppointments;
        if (!ownAppointmentList || ownAppointmentList.length === 0) {
            setIsOwnAppointmentsEmpty(true);
            return;
        }
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

                <CreateAppointmentModal
                    show={showAddModal}
                    handleCreated={handleCreated}
                    handleClose={handleClose}
                />
            </>
        );
    };

    const ownAppointmentsComponent = () => {
        if (isOwnAppointmentsEmpty) {
            return (
                <Typography variant="h6" sx={{ textAlign: "center" }}>
                    You have no appointments for the selected dates
                </Typography>
            );
        }
        return (
            <>
                <Stack spacing={2}>
                    <Grid
                        container
                        sx={{ marginTop: 2, alignItems: "center" }}
                        spacing={2}
                    >
                        {ownAppointments.map((appointment: any) => (
                            <Grid key={appointment.id} size={{ xs: 12, md: 4 }}>
                                <AppointmentCard appointment={appointment} />
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
