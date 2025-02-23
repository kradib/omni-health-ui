export const enum RouteConstants {
  LOGIN_ROUTE = "login",
  REGISTER_ROUTE = "register",
  FORGOT_PASSWORD_ROUTE = "forgot-password",
  APPOINTMENT_ROUTE = "appointments",
}

export class ApiRoutes {
  public static BASE_ROUTE = "/api/v1";

  public static USER_BASE_ROUTE = `${this.BASE_ROUTE}/user`;
  public static APPOINTMENT_BASE_ROUTE = `${this.BASE_ROUTE}/appointment`;

  public static REGISTER_USER_ROUTE = `${this.USER_BASE_ROUTE}/signup`;
  public static LOGIN_USER_ROUTE = `${this.USER_BASE_ROUTE}/signin`;
  public static FORGOT_PASSWORD_ROUTE = `${this.USER_BASE_ROUTE}/forget-password`;
  public static RESET_PASSWORD_ROUTE = `${this.USER_BASE_ROUTE}/reset-password`;
}

export const RESEND_ATTEMPTS = 3;
export const RESEND_TIME_INTERVAL = 60;
export const SNACKBAR_TIMEOUT = 3000;
export const AUTH_TOKEN_KEY = "bearerToken";
export const DATE_FORMAT = "YYYY-MM-DD";
export const TIME_INPUT_FORMAT = "h:mm A";
export const DATE_TIME_FORMAT = "YYYY-MM-DDTHH:mm:ss";
