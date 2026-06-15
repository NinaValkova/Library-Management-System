import { Router } from "express";
import { login, logout, getUser, register, getUsersCount } from "../api/auth";
import { authMiddleware } from "../middleware/auth";

const userRouter = Router();

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.post("/logout", authMiddleware, logout);
userRouter.get("/user", authMiddleware, getUser);
userRouter.get("/users-count", getUsersCount);

export default userRouter;