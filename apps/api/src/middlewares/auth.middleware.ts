import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models";
import { env } from "../config/env";
import { CustomError } from "./errorHandler";

// Extend express request to include user
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export const protect = async (req: Request, res: Response, next: NextFunction) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    const err = new Error("Not authorized to access this route") as CustomError;
    err.statusCode = 401;
    return next(err);
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, env.JWT_SECRET) as any;

    // Attach user to req, excluding password
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      const err = new Error("User no longer exists") as CustomError;
      err.statusCode = 401;
      return next(err);
    }

    req.user = user;
    next();
  } catch (error) {
    return next(error);
  }
};
