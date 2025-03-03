import { ApiRoutes } from "../Constants";
import { IRequest, RequestMethod } from "../interface/IRequest";
import sendRequest from "./request";

export const uploadDocument = async (file: any, docName: string) => {
  const documentData = new FormData();
  documentData.append("file", file);
  documentData.append("documentName", docName); // Add the extra field

  const request: IRequest = {
    method: RequestMethod.POST,
    message: documentData,
    url: ApiRoutes.UPLOAD_FILE_ROUTE,
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

export const getDocuments = async () => {
  const request: IRequest = {
    method: RequestMethod.GET,
    url: ApiRoutes.DOCUMENT_BASE_ROUTE,
    isAuthRequired: true,
    queryParams: {},
  };

  const response = await sendRequest(request);
  if (response.status == 200) {
    return { success: true, data: response.data };
  }
  console.log(
    `Documents fetching failed due to status: ${
      response.status
    } with error: ${JSON.stringify(response)}`
  );
  return { success: false, data: response.data.data?.metadata?.errors[0] };
};

export const downloadFile = async (docId: number) => {
  const request: IRequest = {
    method: RequestMethod.GET,
    url: `${ApiRoutes.DOCUMENT_BASE_ROUTE}/${docId}`,
    isAuthRequired: true,
    queryParams: {},
    responseType: "blob",
  };

  const response = await sendRequest(request);
  if (response.status == 200) {
    const contentDisposition = response.headers?.["content-disposition"];
    const fileName = contentDisposition
      ? contentDisposition.split("filename=")[1]?.replace(/"/g, "")
      : "downloaded-file";

    return { success: true, data: { filename: fileName, file: response.data } };
  }
  console.log(
    `Documents fetching failed due to status: ${
      response.status
    } with error: ${JSON.stringify(response)}`
  );
  return { success: false, data: response.data.data?.metadata?.errors[0] };
};
