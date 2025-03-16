import dayjs from "dayjs";
import { CANCELLED_APPOINTMENT_STATUS, COMPLETED_APPOINTMENT_STATUS, PAST_DUE_APPOINTMENT_STATUS, PENDING_APPOINTMENT_STATUS, USER_DETAILS_KEY } from "../Constants";

export const validateEmail = (email: String) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export const getUserDetailFromLocalStorage = () => {
  const userDetailsString = localStorage.getItem(USER_DETAILS_KEY);

  try {
    if (userDetailsString) {
      return JSON.parse(userDetailsString);
    }
  } catch (e) {
    return null;
  }
};

export const stringToColour = (str: string) => {
  let hash = 0;
  str.split("").forEach((char) => {
    hash = char.charCodeAt(0) + ((hash << 5) - hash);
  });
  let colour = "#";
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff;
    colour += value.toString(16).padStart(2, "0");
  }
  return colour;
};

export const downloadFileFromResponse = (file: any, filename: string) => {
  // Create a Blob URL
  const url = window.URL.createObjectURL(new Blob([file]));

  // Create an invisible link and trigger the download
  const link = document.createElement("a");
  link.href = url;

  // Set the file name (you can get it from headers if needed)
  link.setAttribute("download", filename);

  // Add to the DOM, trigger click, and remove the element
  document.body.appendChild(link);
  link.click();
  link.parentNode?.removeChild(link);
};

export const getAppointmentStatus: any = (appointment: any) => {
  if (
    appointment.appointmentStatus?.toLocaleLowerCase() ==
    CANCELLED_APPOINTMENT_STATUS.toLocaleLowerCase()
  ) {
    return CANCELLED_APPOINTMENT_STATUS;
  }
  if (
    appointment.appointmentStatus?.toLocaleLowerCase() ==
    COMPLETED_APPOINTMENT_STATUS.toLocaleLowerCase()
  ) {
    return COMPLETED_APPOINTMENT_STATUS;
  }
  if (dayjs(appointment.appointmentDateTime).isBefore(dayjs())) {
    return PAST_DUE_APPOINTMENT_STATUS;
  }
  return PENDING_APPOINTMENT_STATUS;
};
