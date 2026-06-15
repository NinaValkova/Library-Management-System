import express from "express";
import cors from "cors";
import borrowRouter from "./api/borrow";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/", borrowRouter);

export default app;