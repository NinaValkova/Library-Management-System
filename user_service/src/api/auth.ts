import { Request, Response, NextFunction } from "express";
import {
  RegisterUser,
  LoginUser,
  LogoutUser,
  GetUser,
  RegisterAdminUser,
  GetUsersCount,
} from "../service/auth.service";
import type {
  RegisterUserRequest,
  RegisterAdminRequest,
  LoginRequest,
  RegisterResponse,
  LoginResponse,
  LogoutResponse,
  SafeUser,
} from "../dto/auth.dto";
import { User } from "../db/schemas/users";

export const toSafeUser = (user: User): SafeUser => {
  return {
    id: user.id,
    firstName: user.firstName,
    secondName: user.secondName,
    username: user.username,
    email: user.email,
    role: user.role,
    birthNumber: user.birthNumber ?? null,
    createdAt: user.createdAt,
  };
};

export const register = async (req: Request<{}, RegisterResponse, RegisterUserRequest>, res: Response<RegisterResponse | { message: string }>) => {
  try {
    const user = await RegisterUser(req.body);
    //const { password: _, ...safeUser } = user;

    const safeUser = toSafeUser(user);

    return res.status(201).json({
      message: "User registered",
      user: safeUser,
    });
  } catch (error) {
    const err = error as Error;
    return res.status(400).json({ message: err.message });
  }
};

export const login = async (req:  Request<{}, LoginResponse, LoginRequest>, res: Response<LoginResponse | { message: string }>) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: "Missing credentials" });
    }
    const { token, user } = await LoginUser(req.body);
    //const { password: _, ...safeUser } = user;

    const safeUser = toSafeUser(user);

    return res.status(200).json({
      message: "Login successful",
      token,
      user: safeUser,
    });
  } catch (error) {
    const err = error as Error;
    return res.status(400).json({ message: err.message });
  }
};

export const logout = async (req: Request, res:  Response<LogoutResponse>) => {
  try {
    const jti = req.user!.jti;
    await LogoutUser(jti);

    return res.status(200).json({
      message: "Logged out",
    });
  } catch (error) {
    const err = error as Error;
    return res.status(500).json({ message: err.message });
  }
};

export const getUsersCount = async (req: Request, res: Response) => {
  try {
    const data = await GetUsersCount();
    return res.status(200).json(data);
  } catch (error) {
    const err = error as Error;
    return res.status(500).json({ message: err.message });
  }
};

export const getUser = async (req: Request,  res: Response<SafeUser | { message: string }>) => {
  try {
    const userId = req.user!.id;
    const user = await GetUser(userId);
    //const { password: _, ...safeUser } = user;

    const safeUser = toSafeUser(user);

    return res.status(200).json(safeUser);
  } catch (error) {
    const err = error as Error;
    return res.status(404).json({ message: err.message });
  }
};

export const registerAdmin = async (req: Request<{}, RegisterResponse, RegisterAdminRequest>, res: Response<RegisterResponse | { message: string }>) => {
  try {
    const user = await RegisterAdminUser(req.body);
    //const { password: _, ...safeUser } = user;

    const safeUser = toSafeUser(user);

    return res.status(201).json({
      message: "Admin user registered",
      user: safeUser,
    });
  } catch (error) {
    const err = error as Error;
    return res.status(400).json({ message: err.message });
  }
};
