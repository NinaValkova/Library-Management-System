import {
  AUTH_STORAGE_KEY,
  USER_SERVICE_URL,
} from "../constants/url";
import type {
  AuthState,
  LoginRequest,
  RegisterRequest,
  User,
  LoginResponse,
  RegisterResponse,
} from "../models/auth";
import { apiRequest } from "../api/apiRequest";


const authService = {
  async login(payload: LoginRequest): Promise<AuthState> {
    const data = await apiRequest<LoginResponse>(
      `${USER_SERVICE_URL}/login`,
      {
        method: "POST",
        body: JSON.stringify(payload),
      }
    );

    const authState: AuthState = {
      token: data.token,
      user: data.user,
    };

    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authState));
    return authState;
  },

  async register(payload: RegisterRequest): Promise<RegisterResponse> {
    return apiRequest<RegisterResponse>(`${USER_SERVICE_URL}/register`, {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  async logout(token: string): Promise<void> {
    await apiRequest<{ message: string }>(`${USER_SERVICE_URL}/logout`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({}),
    });

    localStorage.removeItem(AUTH_STORAGE_KEY);
  },

  async getCurrentUser(token: string): Promise<User> {
    return apiRequest<User>(`${USER_SERVICE_URL}/user`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  async getUsersCount(): Promise<{ totalUsers: number }> {
    return apiRequest<{ totalUsers: number }>(`${USER_SERVICE_URL}/users-count`);
  },

  getStoredAuth(): AuthState {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) {
      return { token: null, user: null };
    }

    try {
      return JSON.parse(raw) as AuthState;
    } catch {
      return { token: null, user: null };
    }
  },

  setStoredAuth(auth: AuthState) {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(auth));
  },

  clearStoredAuth() {
    localStorage.removeItem(AUTH_STORAGE_KEY);
  },

  isAuthenticated(): boolean {
    const auth = this.getStoredAuth();
    return !!auth.token;
  },

  hasRole(role: string): boolean {
    const auth = this.getStoredAuth();
    return auth.user?.role === role;
  },
};

export default authService;