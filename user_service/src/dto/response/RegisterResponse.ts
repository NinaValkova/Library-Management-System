import { SafeUser } from "./SafeUser";

export interface RegisterResponse {
  message: string;
  user: SafeUser;
}