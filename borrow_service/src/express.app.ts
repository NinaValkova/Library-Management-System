import express from "express";
import borrowRouter from "./routes/borrow.router";

const app = express();

app.use(express.json());

app.use("/", borrowRouter);

export default app;