import { z } from "zod";
import { UserRole, EmploymentType, EmploymentStatus, Gender } from "../enums";

/**
 * Validation schema for user registration requests.
 */
export const registerSchema = z.object({
  companyId: z.string().min(1, "Company ID is required"),
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().trim().toLowerCase().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  designation: z.string().trim().min(1, "Designation is required"),
  role: z.nativeEnum(UserRole).optional().default(UserRole.EMPLOYEE),
  employmentType: z.nativeEnum(EmploymentType).optional().default(EmploymentType.FULL_TIME),
  employmentStatus: z.nativeEnum(EmploymentStatus).optional().default(EmploymentStatus.ACTIVE),
  gender: z.nativeEnum(Gender).optional(),
  departmentId: z.string().optional(),
  managerId: z.string().optional(),
  phone: z.string().trim().optional(),
  avatar: z.string().url("Avatar must be a valid URL").optional(),
  dob: z.coerce.date().optional(),
  joinDate: z.coerce.date().optional().default(() => new Date()),
});

export type RegisterInput = z.infer<typeof registerSchema>;

/**
 * Validation schema for user login requests.
 */
export const loginSchema = z.object({
  email: z.string().trim().toLowerCase().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
  companyId: z.string().optional(),
});

export type LoginInput = z.infer<typeof loginSchema>;

/**
 * Validation schema for refresh token requests.
 */
export const refreshTokenSchema = z.object({
  refreshToken: z.string().min(1, "Refresh token is required"),
});

export type RefreshTokenInput = z.infer<typeof refreshTokenSchema>;

/**
 * Validation schema for user logout requests.
 */
export const logoutSchema = z.object({
  refreshToken: z.string().optional(),
});

export type LogoutInput = z.infer<typeof logoutSchema>;


