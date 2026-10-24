import { Request, Response, NextFunction } from "express";
import { User } from "../models";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../services";
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

/**
 * Handles user authentication by checking email and password,
 * verifying active status, and returning tokens with user profile.
 *
 * @route POST /api/auth/login
 * @param {Request} req - Express request object containing login credentials.
 * @param {Response} res - Express response object.
 * @param {NextFunction} next - Express next middleware function.
 */
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, password, companyId } = req.body;

    const query: Record<string, any> = { email };
    if (companyId) {
      query.companyId = companyId;
    }

    // Retrieve user and explicitly select password field
    const user = await User.findOne(query).select("+password");
    if (!user) {
      const error = new Error("Invalid email or password") as CustomError;
      error.statusCode = 401;
      return next(error);
    }

    // Check if the user account is active
    if (!user.isActive) {
      const error = new Error(
        "Account is inactive. Please contact your administrator."
      ) as CustomError;
      error.statusCode = 403;
      return next(error);
    }

    // Verify password against stored hash
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      const error = new Error("Invalid email or password") as CustomError;
      error.statusCode = 401;
      return next(error);
    }

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

    // Update stored refresh token in DB
    user.refreshToken = refreshToken;
    await user.save();

    res.status(200).json({
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

/**
 * Handles access token refreshment by verifying the refresh token,
 * ensuring the user is active with a matching stored token, and issuing new tokens.
 *
 * @route POST /api/auth/refresh-token
 * @param {Request} req - Express request object containing refresh token payload.
 * @param {Response} res - Express response object.
 * @param {NextFunction} next - Express next middleware function.
 */
export const refreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { refreshToken: incomingRefreshToken } = req.body;

    let decoded;
    try {
      decoded = verifyRefreshToken(incomingRefreshToken);
    } catch {
      const error = new Error("Invalid or expired refresh token") as CustomError;
      error.statusCode = 401;
      return next(error);
    }

    const user = await User.findById(decoded.id).select("+refreshToken");
    if (!user) {
      const error = new Error("User not found") as CustomError;
      error.statusCode = 404;
      return next(error);
    }

    if (!user.isActive) {
      const error = new Error(
        "Account is inactive. Please contact your administrator."
      ) as CustomError;
      error.statusCode = 403;
      return next(error);
    }

    if (user.refreshToken !== incomingRefreshToken) {
      const error = new Error("Invalid or expired refresh token") as CustomError;
      error.statusCode = 401;
      return next(error);
    }

    const accessToken = generateAccessToken({
      id: user._id.toString(),
      role: user.role,
      companyId: user.companyId.toString(),
    });

    const newRefreshToken = generateRefreshToken({
      id: user._id.toString(),
      role: user.role,
      companyId: user.companyId.toString(),
    });

    user.refreshToken = newRefreshToken;
    await user.save();

    res.status(200).json({
      success: true,
      data: {
        tokens: {
          accessToken,
          refreshToken: newRefreshToken,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Handles user logout by clearing the stored refresh token in the database.
 * Supports clearing via authenticated session (req.user) or matching refresh token.
 *
 * @route POST /api/auth/logout
 * @param {Request} req - Express request object (contains req.user when protected).
 * @param {Response} res - Express response object.
 * @param {NextFunction} next - Express next middleware function.
 */
export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = req.user?._id || req.user?.id;
    const { refreshToken: incomingToken } = req.body || {};

    if (userId) {
      await User.findByIdAndUpdate(userId, { $unset: { refreshToken: 1 } });
    } else if (incomingToken) {
      await User.findOneAndUpdate(
        { refreshToken: incomingToken },
        { $unset: { refreshToken: 1 } }
      );
    }

    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    next(error);
  }
};


