import express from "express";
import cors from "cors";
import ratingRouter from "./api/rating";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/", ratingRouter);

export default app;