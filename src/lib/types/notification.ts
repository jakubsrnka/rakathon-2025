export type PatientNotification = {
  admin: string;
  flyer?: string;
  text?: string;
  time_to_send: Date | string;
  user: string;
};
