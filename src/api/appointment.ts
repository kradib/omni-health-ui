import { ApiRoutes } from "../Constants";
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
    isAuthRequired: true
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

export const getAppointments = async (params: IGetAppointmentsParams) => {
  const request: IRequest = {
    method: RequestMethod.GET,
    url: ApiRoutes.APPOINTMENT_BASE_ROUTE,
    isAuthRequired: true,
    queryParams: params
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

export const rescheduleAppointment = async (
  appointmentId: number,
  appointmentDetails: IAppointmentDetails
) => {
  const request: IRequest = {
    method: RequestMethod.PATCH,
    message: appointmentDetails,
    url: `${ApiRoutes.APPOINTMENT_BASE_ROUTE}/${appointmentId}`,
    isAuthRequired: true
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
