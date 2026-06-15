import express from "express";
import bookRouter from "./api/book";

const app = express();

app.use(express.json());

app.use("/", bookRouter);

export default app;