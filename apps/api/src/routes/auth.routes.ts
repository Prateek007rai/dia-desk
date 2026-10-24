import { Router } from "express";
import { register, login, refreshToken, logout } from "../controllers/auth.controller";
import { protect, validate } from "../middlewares";
import {
  registerSchema,
  loginSchema,
  refreshTokenSchema,
  logoutSchema,
} from "../validations";

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

/**
 * @route POST /api/auth/logout
 * @desc Invalidate user session and clear refresh token in database
 * @access Private
 */
router.post("/logout", protect, validate(logoutSchema), logout);

export default router;


