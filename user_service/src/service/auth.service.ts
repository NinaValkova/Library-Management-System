import bcrypt from "bcryptjs";
import { generateToken } from "../utils/jwt";
import { UserRepository } from "../repository/user.repository";
import { TokenBlocklistRepository } from "../repository/token_blocklist.repository";
import { RegisterUserRequest } from "../dto/request/RegisterUserRequest";
import { LoginRequest } from "../dto/request/LoginRequest";
import { RegisterAdminRequest } from "../dto/request/RegisterAdminRequest";


export const RegisterUser = async (data: RegisterUserRequest) => {
  const existingUser =
    (await UserRepository.findByEmail(data.email)) ||
    (await UserRepository.findByUsername(data.username));

  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const user = await UserRepository.createUser({
    firstName: data.firstName,
    secondName: data.secondName,
    username: data.username,
    email: data.email,
    password: hashedPassword,
    birthNumber: data.birthNumber,
    role: "user",
  });

  return user;
};

export const LoginUser = async (data: LoginRequest) => {
  const user = await UserRepository.findByUsername(data.username);

  if (!user) {
    throw new Error("User not found");
  }

  const isValid = await bcrypt.compare(data.password, user.password);

  if (!isValid) {
    throw new Error("Invalid credentials");
  }

  const { token } = generateToken({
    id: user.id,
    username: user.username,
    role: user.role,
  });

  return { token, user };
};

export const LogoutUser = async (jti: string) => {
  const existingBlockedToken = await TokenBlocklistRepository.findByJti(jti);

  if (existingBlockedToken) {
    throw new Error("Token already blocked");
  }

  const blockedToken = await TokenBlocklistRepository.createTokenBlocklist({
    jti,
  });

  return { message: "Logged out" }
};

export const GetUser = async (id: number) => {
  const user = await UserRepository.findById(id);

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};


export const RegisterAdminUser = async (data: RegisterAdminRequest) => {
  const existingUser =
    (await UserRepository.findByEmail(data.email)) ||
    (await UserRepository.findByUsername(data.username));

  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const user = await UserRepository.createUser({
    firstName: data.firstName,
    secondName: data.secondName,
    username: data.username,
    email: data.email,
    password: hashedPassword,
    birthNumber: data.birthNumber,
    role: "admin",
  });

  return user;
};

export const GetUsersCount = async () => {
  const count = await UserRepository.countUsers();
  return { totalUsers: count };
};