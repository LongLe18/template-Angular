import { IUser } from "./user";

export interface IResponse {
  isOk: boolean;
  data?: IUser;
  message?: string;
}
