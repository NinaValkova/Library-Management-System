export interface User {
  id: number;
  firstName: string;
  secondName: string;
  username: string;
  email: string;
  role: string;
  birthNumber?: string | null;
  createdAt?: string;
}

export interface AuthState {
  token: string | null;
  user: User | null;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  firstName: string;
  secondName: string;
  username: string;
  email: string;
  password: string;
  birthNumber?: string;
}

export interface LoginResponse {
  message: string;
  token: string;
  user: User;
}

export interface RegisterResponse {
  message: string;
  user: User;
}
