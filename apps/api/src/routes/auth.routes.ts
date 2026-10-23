import { Router } from "express";
import { register, login, refreshToken } from "../controllers/auth.controller";
import { validate } from "../middlewares/validate.middleware";
import { registerSchema, loginSchema, refreshTokenSchema } from "../validations";

const router = Router();

/**
 * @route POST /api/auth/register
 * @desc Register a new user in the system
 * @access Public
 */
router.post("/register", validate(registerSchema), register);

/**
 * @route POST /api/auth/login
 * @desc Authenticate user and return access & refresh tokens
 * @access Public
 */
router.post("/login", validate(loginSchema), login);

/**
 * @route POST /api/auth/refresh-token
 * @desc Refresh access token using a valid refresh token
 * @access Public
 */
router.post("/refresh-token", validate(refreshTokenSchema), refreshToken);

export default router;

