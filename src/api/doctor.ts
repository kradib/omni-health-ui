import { ApiRoutes } from "../Constants";
import { IGetDoctorParams } from "../interface/IGetDoctorParams";
import { IRequest, RequestMethod } from "../interface/IRequest";
import sendRequest from "./request";

export const getDoctors = async (params: IGetDoctorParams) => {
  const request: IRequest = {
    method: RequestMethod.GET,
    url: ApiRoutes.DOCTOR_BASE_ROUTE,
    isAuthRequired: true,
    queryParams: params,
  };

  const response = await sendRequest(request);
  if (response.status == 200) {
    return { success: true, data: response.data };
  }
  console.log(
    `Doctor fetching failed due to status: ${
      response.status
    } with error: ${JSON.stringify(response)}`
  );
  return { success: false, data: response.data.data?.metadata?.errors[0] };
};
