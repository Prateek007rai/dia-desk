import { Request, Response, NextFunction } from "express";
import { ZodError, ZodSchema } from "zod";
import { CustomError } from "./errorHandler";

export const validate = (schema: ZodSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const parsed = await schema.parseAsync(req.body);
      req.body = parsed;
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.errors.map((issue) => `${issue.path.join(".")}: ${issue.message}`).join(", ");
        const err = new Error(errorMessages || "Validation error") as CustomError;
        err.statusCode = 400;
        return next(err);
      }
      return next(error);
    }
  };
};
