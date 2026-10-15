import { Request, Response, NextFunction } from "express";
import { User } from "../models";
import { generateAccessToken, generateRefreshToken } from "../services";
import { CustomError } from "../middlewares/errorHandler";

/**
 * Handles user registration by checking uniqueness, hashing credentials,
 * persisting the new user record, and issuing JWT access and refresh tokens.
 *
 * @route POST /api/auth/register
 * @param {Request} req - Express request object containing registration payload.
 * @param {Response} res - Express response object.
 * @param {NextFunction} next - Express next middleware function.
 */
export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const {
      companyId,
      name,
      email,
      password,
      role,
      designation,
      employmentType,
      employmentStatus,
      departmentId,
      managerId,
      phone,
      avatar,
      dob,
      gender,
      joinDate,
    } = req.body;

    // Check if user already exists for this company
    const existingUser = await User.findOne({ companyId, email });
    if (existingUser) {
      const error = new Error(
        "User already exists with this email for this company"
      ) as CustomError;
      error.statusCode = 400;
      return next(error);
    }

    // Create user document (password hashed via pre-save hook)
    const user = new User({
      companyId,
      name,
      email,
      password,
      role,
      designation,
      employmentType,
      employmentStatus,
      departmentId,
      managerId,
      phone,
      avatar,
      dob,
      gender,
      joinDate: joinDate || new Date(),
    });

    // Generate authentication tokens
    const accessToken = generateAccessToken({
      id: user._id.toString(),
      role: user.role,
      companyId: user.companyId.toString(),
    });

    const refreshToken = generateRefreshToken({
      id: user._id.toString(),
      role: user.role,
      companyId: user.companyId.toString(),
    });

    // Persist refresh token with user
    user.refreshToken = refreshToken;
    await user.save();

    res.status(201).json({
      success: true,
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          companyId: user.companyId,
          designation: user.designation,
          employmentType: user.employmentType,
          employmentStatus: user.employmentStatus,
          joinDate: user.joinDate,
        },
        tokens: {
          accessToken,
          refreshToken,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};
