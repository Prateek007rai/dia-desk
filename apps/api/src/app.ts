import express, { Application, Request, Response } from "express";

const app: Application = express();

// Basic route for testing
app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({ status: "ok", message: "Dia Desk API is running" });
});

export default app;
