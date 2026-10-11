import { Request, Response, NextFunction } from "express";
import { ZodError, ZodSchema } from "zod";
import { CustomError } from "./errorHandler";

/**
 * Middleware factory to validate incoming request bodies against a Zod schema.
 * Replaces req.body with the sanitized parsed data on success, or forwards
 * a structured 400 Bad Request error to the global errorHandler on validation failure.
 *
 * @param {ZodSchema} schema - The Zod schema to validate req.body against.
 * @returns {(req: Request, res: Response, next: NextFunction) => Promise<void>} Express middleware function.
 *
 * @example
 * const registerSchema = z.object({ email: z.string().email(), password: z.string().min(8) });
 * router.post("/register", validate(registerSchema), registerUser);
 */
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
