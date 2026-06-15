import { Router } from "express";
import { registerAdmin } from "../api/auth";
import { authMiddleware } from "../middleware/auth";
import { requireAdmin } from "../middleware/roles";

const adminRouter = Router();

adminRouter.post("/registerAdmin", authMiddleware, requireAdmin, registerAdmin);

export default adminRouter;