import { createContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import authService from "../services/authService";
import type {
  AuthState,
  LoginRequest,
  RegisterRequest,
  User,
} from "../models/auth";

interface AuthContextType {
  auth: AuthState;
  login: (payload: LoginRequest) => Promise<void>;
  register: (payload: RegisterRequest) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<User | null>;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface Props {
  children: ReactNode;
}

export function AuthProvider({ children }: Props) {
  const [auth, setAuth] = useState<AuthState>(authService.getStoredAuth());

  useEffect(() => {
    authService.setStoredAuth(auth);
  }, [auth]);

  const login = async (payload: LoginRequest) => {
    const data = await authService.login(payload);
    setAuth(data);
  };

  const register = async (payload: RegisterRequest) => {
    await authService.register(payload);
  };

  const logout = async () => {
    if (auth.token) {
      try {
        await authService.logout(auth.token);
      } catch {
        // ignore
      }
    }
    authService.clearStoredAuth();
    setAuth({ token: null, user: null });
  };

  const refreshUser = async () => {
    if (!auth.token) return null;

    try {
      const user = await authService.getCurrentUser(auth.token);
      const nextAuth = { ...auth, user };
      setAuth(nextAuth);
      return user;
    } catch {
      authService.clearStoredAuth();
      setAuth({ token: null, user: null });
      return null;
    }
  };

  const value = useMemo(
    () => ({
      auth,
      login,
      register,
      logout,
      refreshUser,
      isAuthenticated: !!auth.token,
    }),
    [auth]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}