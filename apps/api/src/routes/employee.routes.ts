import { Router } from "express";
import { getEmployees } from "../controllers/employee.controller";
import { protect, validateQuery } from "../middlewares";
import { getEmployeesQuerySchema } from "../validations";

const router = Router();

/**
 * @route GET /api/employees
 * @desc Retrieve a paginated list of employees with optional filters
 * @access Private
 */
router.get("/", protect, validateQuery(getEmployeesQuerySchema), getEmployees);

export default router;
