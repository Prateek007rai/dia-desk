import { Request, Response, NextFunction } from "express";
import { UserRole } from "../enums";
import { CustomError } from "./errorHandler";

/**
 * Middleware factory to restrict endpoint access based on user roles.
 * Verifies that the authenticated user possesses one of the allowed roles.
 *
 * @param {...UserRole[]} roles - One or more allowed UserRole enum values.
 * @returns {(req: Request, res: Response, next: NextFunction) => void} Express middleware function.
 *
 * @example
 * // Restrict access to admin and HR managers only
 * router.post("/departments", protect, restrictTo(UserRole.COMPANY_ADMIN, UserRole.HR_MANAGER), createDepartment);
 */
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
