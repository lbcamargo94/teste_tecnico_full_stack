import { AxiosError } from "axios";

export interface Errors extends Error {
  type?: string;
  severity?: string;
  isAxiosError?: string;
  errAxios?: AxiosError;
  response: {
    status: number;
  };
  expiredAt: Date;
}
