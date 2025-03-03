export enum RequestMethod {
    GET = "get",
    POST = "post",
    PATCH = "patch",
    DELETE = "delete"
};

export interface IRequest {
    method: RequestMethod;
    queryParams?: Object;
    message?: Object;
    url: String;
    isAuthRequired?: boolean;
    headers?: any;
    responseType?: any;
}