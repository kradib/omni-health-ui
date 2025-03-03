import axios, { AxiosError } from "axios";
import { IRequest } from "../interface/IRequest";
import { AUTH_TOKEN_KEY } from "../Constants";

const BASE_URL = import.meta.env.VITE_API_URL;

const sendRequest = async (req: IRequest) => {
  const finalUrl = BASE_URL + req.url;
  let requestConfig = {
    method: req.method,
    url: finalUrl,
    data: req.message,
    headers: req.headers || {},
    params: req.queryParams,
    responseType: req.responseType,
  };

  if (req.isAuthRequired === true) {
    requestConfig.headers = {
      ...requestConfig.headers,
      Authorization: "Bearer " + getBearerToken(),
    };
  }

  try {
    const response = await axios(requestConfig);
    return {
      status: response.status,
      data: response.data,
      headers: response.headers,
    };
  } catch (err) {
    const error = err as AxiosError;
    return { status: error.status, data: error.response };
  }
};

export default sendRequest;

const getBearerToken = () => {
  return localStorage.getItem(AUTH_TOKEN_KEY);
};
