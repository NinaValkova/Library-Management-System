export interface RegisterUserRequest {
  firstName: string;
  secondName: string;
  username: string;
  email: string;
  password: string;
  birthNumber?: string;
}

export interface RegisterAdminRequest {
  firstName: string;
  secondName: string;
  username: string;
  email: string;
  password: string;
  birthNumber?: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface SafeUser {
  id: number;
  firstName: string;
  secondName: string;
  username: string;
  email: string;
  role: string;
  birthNumber?: string | null;
  createdAt: Date;
}

export interface RegisterResponse {
  message: string;
  user: SafeUser;
}

export interface LoginResponse {
  message: string;
  token: string;
  user: SafeUser;
}

export interface LogoutResponse {
  message: string;
}