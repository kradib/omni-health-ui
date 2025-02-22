import { ApiRoutes } from "../Constants";
import { IAppointmentDetails } from "../interface/IAppointmentDetails";
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
