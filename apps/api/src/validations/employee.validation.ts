import { z } from "zod";
import { UserRole, EmploymentStatus } from "../enums";

/**
 * Validation schema for employee list query parameters.
 */
export const getEmployeesQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(10),
  departmentId: z.string().trim().optional(),
  role: z.nativeEnum(UserRole).optional(),
  employmentStatus: z.nativeEnum(EmploymentStatus).optional(),
  search: z.string().trim().optional(),
  sortBy: z.enum(["name", "email", "role", "joinDate", "createdAt"]).default("createdAt"),
  sortOrder: z.enum(["asc", "desc"]).default("desc"),
});

export type GetEmployeesQueryInput = z.infer<typeof getEmployeesQuerySchema>;
