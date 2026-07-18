export interface RegisterAdminRequest {
  firstName: string;
  secondName: string;
  username: string;
  email: string;
  password: string;
  birthNumber?: string;
}