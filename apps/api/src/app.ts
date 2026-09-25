import express, { Application, Request, Response } from "express";

import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

const app: Application = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

// Basic route for testing
app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({ status: "ok", message: "Dia Desk API is running" });
});

export default app;
