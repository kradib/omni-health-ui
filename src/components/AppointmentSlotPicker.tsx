import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid2";
import Button from "@mui/material/Button";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider/LocalizationProvider";
import { DATE_FORMAT, DATE_TIME_FORMAT, TIME_INPUT_FORMAT } from "../Constants";
import { useTheme } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
interface IAppointmentSlotPickerProps {
    onChange?: any;
    appointmentDateTime?: string;
}

const ALLOWED_TIME_SLOTS = [
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "01:00 PM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
    "05:00 PM",
    "06:00 PM",
    "07:00 PM",
];

const getAllowedSlots = (givenDate: any, refDate: any) => {
    return ALLOWED_TIME_SLOTS.filter((timeSlot: string) => {
        // Allow only those time slots after current time
        const dateTime = dayjs(
            `${givenDate.format(DATE_FORMAT)} ${timeSlot}`,
            `${DATE_FORMAT} ${TIME_INPUT_FORMAT}`
        );
        return dateTime.isAfter(refDate);
    });
};

const AppointmentSlotPicker: React.FC<IAppointmentSlotPickerProps> = ({
    onChange,
    appointmentDateTime,
}) => {
    const theme = useTheme();

    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

    const inputDate = appointmentDateTime
        ? dayjs(appointmentDateTime, DATE_TIME_FORMAT)
        : undefined;

    const inputTime = appointmentDateTime
        ? dayjs(appointmentDateTime, DATE_TIME_FORMAT).format(TIME_INPUT_FORMAT)
        : undefined;

    let defaultDate = dayjs();
    let allowedSlots = getAllowedSlots(defaultDate, dayjs());

    if (allowedSlots.length == 0) {
        // No more slots available today
        defaultDate = defaultDate.add(1, "day");
    }

    const [selectedDate, setSelectedDate] = useState(inputDate ?? defaultDate);
    allowedSlots = getAllowedSlots(selectedDate, dayjs());

    const [selectedTime, setSelectedTime] = useState(
        inputTime ?? allowedSlots[0]
    );

    if (!allowedSlots.includes(selectedTime)) {
        setSelectedTime(allowedSlots[0]);
    }

    const handleTimeChange = (event: any) => {
        const newTime = event.target.value;
        if (newTime !== null) {
            setSelectedTime(newTime);
        }
    };

    const handleDateChange = (newValue: any) => {
        setSelectedDate(newValue);
    };

    useEffect(() => {
        if (onChange !== null || onChange !== undefined) {
            onChange(selectedTime, selectedDate);
        }
    }, [selectedTime, selectedDate]);

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
                        {allowedSlots.map((timeSlot: string) => (
                            <Grid key={timeSlot} size={{ xs: 4 }}>
                                <Button
                                    variant={selectedTime == timeSlot ? "contained" : "outlined"}
                                    size={isSmallScreen ? "medium" : "large"}
                                    color="primary"
                                    key={timeSlot}
                                    value={timeSlot}
                                    onClick={handleTimeChange}
                                >
                                    {timeSlot}
                                </Button>
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
