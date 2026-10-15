import { Router } from "express";
import { register } from "../controllers/auth.controller";
import { validate } from "../middlewares/validate.middleware";
import { registerSchema } from "../validations/auth.validation";

const router = Router();

/**
 * @route POST /api/auth/register
 * @desc Register a new user in the system
 * @access Public
 */
router.post("/register", validate(registerSchema), register);

export default router;
