import express from "express";
import ratingRouter from "./routes/rating.router";

const app = express();

app.use(express.json());

app.use("/", ratingRouter);

export default app;