import { Request, Response, NextFunction } from "express";

export interface CustomError extends Error {
  statusCode?: number;
  code?: number;
  keyValue?: any;
  errors?: any;
}

/**
 * Global error handling middleware for Express.
 * Catches structured CustomErrors and formats them into a standard JSON response.
 * Maps common Mongoose and JWT errors into the standard format.
 * 
 * @param {CustomError} err - The error object caught by the express router
 * @param {Request} req - The Express request object
 * @param {Response} res - The Express response object
 * @param {NextFunction} next - The next middleware function
 */
export const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let error = { ...err };
  error.message = err.message;

  // Log to console for dev
  console.error(err);

  // Mongoose bad ObjectId
  if (err.name === "CastError") {
    const message = "Resource not found";
    error = new Error(message) as CustomError;
    error.statusCode = 404;
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const message = "Duplicate field value entered";
    error = new Error(message) as CustomError;
    error.statusCode = 400;
  }

  // Mongoose validation error
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors || {}).map((val: any) => val.message).join(", ");
    error = new Error(message) as CustomError;
    error.statusCode = 400;
  }

  // JWT errors
  if (err.name === "JsonWebTokenError") {
    const message = "Not authorized to access this route";
    error = new Error(message) as CustomError;
    error.statusCode = 401;
  }

  if (err.name === "TokenExpiredError") {
    const message = "Session expired, please login again";
    error = new Error(message) as CustomError;
    error.statusCode = 401;
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || "Server Error",
  });
};
