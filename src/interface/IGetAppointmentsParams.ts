export interface IGetAppointmentsParams {
  startDate?: string;
  endDate?: string;
  status?: "all" | "cancelled" | "upcoming" | "completed"
  page: number;
  size: number;
}
