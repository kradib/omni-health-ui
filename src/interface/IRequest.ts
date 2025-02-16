export enum RequestMethod {
    GET = "get",
    POST = "post",
    PATCH = "patch",
    DELETE = "delete"
};

export interface IRequest {
    method: RequestMethod;
    queryParams?: String;
    message?: Object;
    url: String;
    isAuthRequired?: boolean;
}