import { ApiRoutes } from "../Constants";
import { IRequest, RequestMethod } from "../interface/IRequest";
import { IUserDetails } from "../interface/IUserDetails";
import sendRequest from "./request";

export const signupUser = async (userDetails: IUserDetails) => {
  const request: IRequest = {
    method: RequestMethod.POST,
    message: userDetails,
    url: ApiRoutes.REGISTER_USER_ROUTE,
  };
  const response = await sendRequest(request);

  if (response.status == 200) {
    return { success: true, data: "User registration successful" };
  }
  console.log(
    `User registration failed due to status: ${
      response.status
    } with error: ${JSON.stringify(response.data.data.metadata.errors[0])}`
  );
  return { success: false, data: response.data.data?.metadata?.errors[0] };
};
  if (response.status == 400) {
    return { success: false, data: "Username already exists" };
  }
  console.log(
    `User registration failed due to status: ${response.status} with error: ${response.data}`
  );
  return { success: false, data: "User registration failed" };
};
