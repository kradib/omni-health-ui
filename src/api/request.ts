import axios, { AxiosError } from "axios";
import { IRequest } from "../interface/IRequest";

const BASE_URL = "http://localhost:8080";

const sendRequest = async (req: IRequest) => {
  const finalUrl = BASE_URL + req.url;
  let requestConfig = {
    method: req.method,
    url: finalUrl,
    data: req.message,
    headers: {},
  };

  if (req.isAuthRequired === true) {
    requestConfig.headers = {
      ...requestConfig.headers,
      Authorization: "Bearer " + getBearerToken(),
    };
  }

  try {
    const response = await axios(requestConfig);
    return { status: response.status, data: response.data };
  } catch (err) {
    const error = err as AxiosError;
    return { status: error.status, data: error.response };
  }
};

export default sendRequest;

function getBearerToken() {
  return "abcd";
}
