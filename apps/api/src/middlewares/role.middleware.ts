import { Request, Response, NextFunction } from "express";
import { UserRole } from "../enums";
import { CustomError } from "./errorHandler";

export const restrictTo = (...roles: UserRole[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      const err = new Error("Authentication required") as CustomError;
      err.statusCode = 401;
      return next(err);
    }

    if (!roles.includes(req.user.role)) {
      const err = new Error("You do not have permission to perform this action") as CustomError;
      err.statusCode = 403;
      return next(err);
    }

    next();
  };
};
