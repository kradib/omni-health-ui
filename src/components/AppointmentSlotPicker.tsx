import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import React, { useEffect, useRef, useState } from "react";
import Grid from "@mui/material/Grid2";
import Button from "@mui/material/Button";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider/LocalizationProvider";
import { DATE_FORMAT, DATE_TIME_FORMAT, TIME_INPUT_FORMAT } from "../Constants";
import { useTheme } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import useMediaQuery from "@mui/material/useMediaQuery";
import { getAppointmentSlots } from "../api/appointment";
interface IAppointmentSlotPickerProps {
    onChange?: any;
    appointmentDateTime?: string;
    slotId?: string;
    doctorId: string;
}

const AppointmentSlotPicker: React.FC<IAppointmentSlotPickerProps> = ({
    onChange,
    appointmentDateTime,
    slotId,
    doctorId,
}) => {
    const [allowedSlots, setAllowedSlots] = useState<any>([]);
    const slotsFetched = useRef(false);

    const theme = useTheme();

    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

    const inputDate = appointmentDateTime
        ? dayjs(appointmentDateTime, DATE_TIME_FORMAT)
        : undefined;

    const inputTime = appointmentDateTime
        ? dayjs(appointmentDateTime, DATE_TIME_FORMAT).format(TIME_INPUT_FORMAT)
        : undefined;

    let defaultDate = dayjs();
    const [selectedDate, setSelectedDate] = useState(inputDate ?? defaultDate);

    const [selectedTime, setSelectedTime] = useState(
        inputTime ?? allowedSlots[0]?.slot?.time
    );

    const [selectedSlot, setSelectedSlot] = useState({});

    const handleTimeChange = (newSlot: any) => {
        if (newSlot !== null) {
            setSelectedTime(newSlot.slot.time);
            setSelectedSlot(newSlot);
        }
    };

    const handleDateChange = (newValue: any) => {
        setSelectedDate(newValue);
    };

    useEffect(() => {
        if (onChange !== null || onChange !== undefined) {
            onChange(selectedTime, selectedDate, selectedSlot);
        }
    }, [selectedTime, selectedDate, selectedSlot]);

    useEffect(() => {
        const getAllowedSlots = async () => {
            const response = await getAppointmentSlots({
                doctorId: doctorId,
                appointmentDate: selectedDate.format(DATE_FORMAT),
            });

            const allowedTimeSlots =
                response.data?.data?.appointmentSlotAvailableList || [];
            slotsFetched.current = true;
            setAllowedSlots(
                allowedTimeSlots.filter((timeSlot: any) => {
                    // Allow only those time slots after current time
                    const dateTime = dayjs(
                        `${selectedDate.format(DATE_FORMAT)} ${timeSlot.slot.time}`,
                        `${DATE_FORMAT} ${TIME_INPUT_FORMAT}`
                    );
                    return dateTime.isAfter(dayjs());
                })
            );
        };

        getAllowedSlots();
    }, [selectedDate]);

    useEffect(() => {
        if (allowedSlots.length === 0 && slotsFetched.current) {
            setSelectedDate((prevDate) => prevDate.add(1, "day"));
        } else {
            slotsFetched.current = false;
        }
    }, [allowedSlots]);

    useEffect(() => {
        if (
            allowedSlots.length > 0 &&
            inputTime &&
            allowedSlots.map((slot: any) => slot.slot.time).includes(inputTime)
        ) {
            setSelectedTime(inputTime);
            setSelectedSlot(
                allowedSlots.filter((timeSlot: any) => timeSlot.slot.id == slotId)[0]
            );
        } else if (
            allowedSlots.length > 0 &&
            ((inputTime &&
                !allowedSlots.map((slot: any) => slot.slot.time).includes(inputTime)) ||
                !inputTime)
        ) {
            setSelectedTime(allowedSlots[0].slot.time);
            setSelectedSlot(allowedSlots[0]);
        }
    }, [allowedSlots]);

    const datePicker = () => {
        return (
            <>
                <Stack spacing={1}>
                    <Stack direction="row" sx={{ justifyContent: "space-between" }}>
                        <Typography variant="body1" sx={{ mb: 1 }}>
                            Select date
                        </Typography>
                        <CalendarMonthIcon />
                    </Stack>

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            shouldDisableDate={(date) => date.isBefore(defaultDate, "day")}
                            value={selectedDate}
                            onChange={handleDateChange}
                            format={DATE_FORMAT}
                        />
                    </LocalizationProvider>
                </Stack>
            </>
        );
    };

    const timePicker = () => {
        return (
            <>
                <Stack spacing={1}>
                    <Stack direction="row" sx={{ justifyContent: "space-between" }}>
                        <Typography variant="body1" sx={{ mb: 1 }}>
                            Select time
                        </Typography>
                        <AccessTimeIcon />
                    </Stack>

                    <Grid container spacing={1}>
                        {allowedSlots.map((timeSlot: any) => (
                            <Grid key={timeSlot.slot.time} size={{ xs: 4 }}>
                                <Tooltip
                                    title={`Available Slots: ${timeSlot.availableSLots}`}
                                    arrow
                                >
                                    <Button
                                        variant={
                                            selectedTime == timeSlot.slot.time
                                                ? "contained"
                                                : "outlined"
                                        }
                                        size={isSmallScreen ? "medium" : "large"}
                                        color="primary"
                                        key={timeSlot.slot.time}
                                        onClick={() => handleTimeChange(timeSlot)}
                                        disabled={timeSlot.availableSLots <= 0}
                                    >
                                        {timeSlot.slot.time}
                                    </Button>
                                </Tooltip>
                            </Grid>
                        ))}
                    </Grid>
                </Stack>
            </>
        );
    };

    return (
        <>
            {datePicker()}
            {timePicker()}
        </>
    );
};

export default AppointmentSlotPicker;
