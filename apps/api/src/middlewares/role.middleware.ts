import { Request, Response, NextFunction } from "express";
import { UserRole } from "../enums";
import { CustomError } from "./errorHandler";

export const restrictTo = (...roles: UserRole[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    // Role check logic will be implemented here
    next();
  };
};
