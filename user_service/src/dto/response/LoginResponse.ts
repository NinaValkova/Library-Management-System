import { SafeUser } from "./SafeUser";

export interface LoginResponse {
  message: string;
  token: string;
  user: SafeUser;
}