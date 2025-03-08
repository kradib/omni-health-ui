import React, { useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { IAppointmentDetails } from "../interface/IAppointmentDetails";
import { createAppointment, rescheduleAppointment } from "../api/appointment";
import TimeSlotPicker from "./AppointmentSlotPicker";
import dayjs from "dayjs";
import { DATE_FORMAT, DATE_TIME_FORMAT, TIME_INPUT_FORMAT } from "../Constants";
import Autocomplete from "@mui/material/Autocomplete";
import { getDoctors } from "../api/doctor";
import ModalComponent from "./ModalComponent";

type CreateAppointmentModalProps =
    | {
        show: boolean;
        handleCreated: any;
        handleClose: any;
        isRescheduling: true;
        rescheduleAppointmentDetails: IAppointmentDetails; // Required when rescheduling
        appointmentId: number;
    }
    | {
        show: boolean;
        handleCreated: any;
        handleClose: any;
        isRescheduling?: false;
        rescheduleAppointmentDetails?: undefined; // Undefined when not rescheduling
        appointmentId?: undefined;
    };

const isValidInput = (appointmentDetails: IAppointmentDetails) => {
    return (
        appointmentDetails.appointmentDateTime.length > 0 &&
        appointmentDetails.appointmentPlace.length > 0 &&
        appointmentDetails.doctorId?.toString().length > 0
    );
};

const CreateAppointmentModal: React.FC<CreateAppointmentModalProps> = ({
    show,
    handleCreated,
    handleClose,
    isRescheduling,
    rescheduleAppointmentDetails,
    appointmentId,
}) => {
    const initialAppointmentState = {
        appointmentDateTime: "",
        appointmentPlace: "",
        doctorId: "",
        slotId: "",
    };

    const [appointment, setAppointment] = useState(
        isRescheduling ? rescheduleAppointmentDetails : initialAppointmentState
    );

    const [loading, setLoading] = useState(false);
    const [pageNumber, setPageNumber] = useState(isRescheduling ? 2 : 1);
    const [doctors, setDoctors] = useState([]);

    const [selectedDoctor, setSelectedDoctor] = useState(null);

    const handleCreateOrUpdateAppointment = async () => {
        setLoading(true);
        let response;
        if (!isRescheduling) {
            // Then new creation
            response = await createAppointment(appointment);
        } else {
            // Else reschedule
            response = await rescheduleAppointment(appointmentId, appointment);
        }
        setLoading(false);
        setAppointment(initialAppointmentState);
        setSelectedDoctor(null);
        setPageNumber(1);
        handleCreated(response.data, response.success ? "success" : "error");
    };

    const handleGetDoctors = async (doctorName?: string) => {
        const response = await getDoctors({ name: doctorName });
        if (response.success) {
            setDoctors(response.data.data.doctorDetails);
        }
    };

    const handleTimeChange = (time: string, date: any, slot: any) => {
        const finalDate = dayjs(
            `${date.format(DATE_FORMAT)} ${time}`,
            `${DATE_FORMAT} ${TIME_INPUT_FORMAT}`
        ).format(DATE_TIME_FORMAT);
        console.log(finalDate);
        setAppointment({
            ...appointment,
            appointmentDateTime: finalDate,
            slotId: slot?.slot?.id || "",
        });
    };

    const timeSlot = () => {
        return (
            <TimeSlotPicker
                onChange={handleTimeChange}
                appointmentDateTime={
                    isRescheduling ? appointment.appointmentDateTime : undefined
                }
                doctorId={appointment.doctorId}
            />
        );
    };

    useEffect(() => {
        handleGetDoctors(undefined);
    }, []);

    return (
        <>
            <ModalComponent
                open={show}
                onClose={handleClose}
                title={isRescheduling ? "Reschedule Appointment" : "New Appointment"}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                {pageNumber == 1 && !isRescheduling && (
                    <>
                        <Autocomplete
                            id="doctorName"
                            options={doctors}
                            getOptionLabel={(value: any) =>
                                `${value.firstName} ${value.lastName}`
                            }
                            autoSelect
                            onChange={(_e, value: any) => {
                                console.log("Doctor value", value);
                                if (value) {
                                    setAppointment({
                                        ...appointment,
                                        doctorId: `${value.id}`,
                                        appointmentPlace: value.location,
                                    });
                                    setSelectedDoctor(value);
                                }
                            }}
                            onInputChange={(_e, value) => {
                                if (value && value.length > 3) {
                                    handleGetDoctors(value);
                                }
                            }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Select Doctor"
                                    variant="outlined"
                                />
                            )}
                            value={selectedDoctor}
                        />
                        <TextField
                            id="appointmentPlace"
                            label="Appointment Place"
                            disabled
                            onChange={(e) =>
                                setAppointment({
                                    ...appointment,
                                    appointmentPlace: e.target.value,
                                })
                            }
                            variant="outlined"
                            value={appointment.appointmentPlace}
                        />
                        <Button
                            variant="contained"
                            disabled={!appointment.doctorId || !appointment.appointmentPlace}
                            onClick={() => setPageNumber(2)}
                            size="large"
                        >
                            Next
                        </Button>
                    </>
                )}

                {pageNumber == 2 && (
                    <>
                        {timeSlot()}
                        {!isRescheduling && (
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
                                    onClick={handleCreateOrUpdateAppointment}
                                    size="large"
                                    loading={loading}
                                    sx={{ flex: 1 }}
                                >
                                    Create Appointment
                                </Button>
                            </Stack>
                        )}
                    </>
                )}

                {isRescheduling && (
                    <Button
                        variant="contained"
                        disabled={!isValidInput(appointment)}
                        onClick={handleCreateOrUpdateAppointment}
                        size="large"
                        loading={loading}
                        sx={{ flex: 1 }}
                    >
                        Reschedule Appointment
                    </Button>
                )}
            </ModalComponent>
        </>
    );
};

export default CreateAppointmentModal;
