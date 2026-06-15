import express from "express";
import userRouter from "./routes/user.router";
import adminRouter from "./routes/admin.router";

const app = express();

app.use(express.json());

app.use("/auth", userRouter);
app.use("/admin", adminRouter);

export default app;