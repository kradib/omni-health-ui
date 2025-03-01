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
