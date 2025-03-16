import { ApiRoutes, APPOINTMENT_MODE_DEPENDENT } from "../Constants";
import { IAppointmentDetails } from "../interface/IAppointmentDetails";
import { IGetAppointmentsParams } from "../interface/IGetAppointmentsParams";
import { IRequest, RequestMethod } from "../interface/IRequest";
import sendRequest from "./request";

export const createAppointment = async (
  appointmentDetails: IAppointmentDetails
) => {
  const request: IRequest = {
    method: RequestMethod.POST,
    message: appointmentDetails,
    url: ApiRoutes.APPOINTMENT_BASE_ROUTE,
    isAuthRequired: true,
  };

  const response = await sendRequest(request);
  if (response.status == 200) {
    return { success: true, data: "Appointment successfully created" };
  }
  console.log(
    `Appointment creation failed due to status: ${
      response.status
    } with error: ${JSON.stringify(response)}`
  );
  return { success: false, data: response.data.data?.metadata?.errors[0] };
};

export const getAppointments = async (
  params: IGetAppointmentsParams,
  mode: string
) => {
  const request: IRequest = {
    method: RequestMethod.GET,
    url:
      mode == APPOINTMENT_MODE_DEPENDENT
        ? ApiRoutes.DEPENDENT_APPOINTMENT_ROUTE
        : ApiRoutes.APPOINTMENT_BASE_ROUTE,
    isAuthRequired: true,
    queryParams: params,
  };

  const response = await sendRequest(request);
  if (response.status == 200) {
    return { success: true, data: response.data };
  }
  console.log(
    `Appointments fetching failed due to status: ${
      response.status
    } with error: ${JSON.stringify(response)}`
  );
  return { success: false, data: response.data.data?.metadata?.errors[0] };
};

export const getAppointment = async (appointmentId: number) => {
  const request: IRequest = {
    method: RequestMethod.GET,
    url: `${ApiRoutes.APPOINTMENT_BASE_ROUTE}/${appointmentId}`,
    isAuthRequired: true,
  };

  const response = await sendRequest(request);
  if (response.status == 200) {
    return { success: true, data: response.data };
  }
  console.log(
    `Appointment fetching failed due to status: ${
      response.status
    } with error: ${JSON.stringify(response)}`
  );
  return { success: false, data: response.data.data?.metadata?.errors[0] };
};

export const getAppointmentSlots = async (params: any) => {
  const request: IRequest = {
    method: RequestMethod.GET,
    url: ApiRoutes.APPOINTMENT_SLOT_ROUTE,
    isAuthRequired: true,
    queryParams: params,
  };

  const response = await sendRequest(request);
  if (response.status == 200) {
    return { success: true, data: response.data };
  }
  console.log(
    `Appointment slot fetching failed due to status: ${
      response.status
    } with error: ${JSON.stringify(response)}`
  );
  return { success: false, data: response.data.data?.metadata?.errors[0] };
};

export const rescheduleAppointment = async (
  appointmentId: number,
  appointmentDetails: IAppointmentDetails
) => {
  const request: IRequest = {
    method: RequestMethod.PATCH,
    message: appointmentDetails,
    url: `${ApiRoutes.APPOINTMENT_BASE_ROUTE}/${appointmentId}`,
    isAuthRequired: true,
  };

  const response = await sendRequest(request);
  if (response.status == 200) {
    return { success: true, data: "Appointment successfully rescheduled" };
  }
  console.log(
    `Appointment reschedule failed due to status: ${
      response.status
    } with error: ${JSON.stringify(response)}`
  );
  return { success: false, data: response.data.data?.metadata?.errors[0] };
};

export const cancelAppointment = async (appointmentId: number) => {
  const request: IRequest = {
    method: RequestMethod.DELETE,
    url: ApiRoutes.APPOINTMENT_BASE_ROUTE,
    message: { appointmentId: appointmentId },
    isAuthRequired: true,
  };

  const response = await sendRequest(request);
  if (response.status == 200) {
    return { success: true, data: "Appointment successfully cancelled" };
  }
  console.log(
    `Appointment cancellation failed due to status: ${
      response.status
    } with error: ${JSON.stringify(response)}`
  );
  return { success: false, data: response.data.data?.metadata?.errors[0] };
};

export const addAppointmentNote = async (
  appointmentId: number,
  appointmentNote: any
) => {
  const request: IRequest = {
    method: RequestMethod.POST,
    message: appointmentNote,
    url: `${ApiRoutes.APPOINTMENT_BASE_ROUTE}/${appointmentId}/${ApiRoutes.APPOINTMENT_NOTES_ROUTE}`,
    isAuthRequired: true,
  };

  const response = await sendRequest(request);
  if (response.status == 200) {
    return { success: true, data: "Appointment note successfully added" };
  }
  console.log(
    `Appointment note adding failed due to status: ${
      response.status
    } with error: ${JSON.stringify(response)}`
  );
  return { success: false, data: response.data.data?.metadata?.errors[0] };
};

export const uploadAppointmentDocument = async (
  file: any,
  docName: string,
  appointmentId: number
) => {
  const documentData = new FormData();
  documentData.append("file", file);
  documentData.append("documentName", docName);

  const request: IRequest = {
    method: RequestMethod.POST,
    message: documentData,
    url: `${ApiRoutes.APPOINTMENT_BASE_ROUTE}/${appointmentId}/${ApiRoutes.APPOINTMENT_DOCUMENT_ROUTE}`,
    isAuthRequired: true,
  };

  const response = await sendRequest(request);
  if (response.status == 200) {
    return { success: true, data: "File uploaded successfully" };
  }
  console.log(
    `File uploading failed due to status: ${
      response.status
    } with error: ${JSON.stringify(response)}`
  );
  return { success: false, data: response.data.data?.metadata?.errors[0] };
};
