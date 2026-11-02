import { Request, Response, NextFunction } from "express";
import { User } from "../models";

/**
 * Retrieves a paginated list of employees with optional department,
 * role, employment status, and text search filters.
 *
 * @route GET /api/employees
 * @param {Request} req - Express request object containing query filters and authenticated user.
 * @param {Response} res - Express response object.
 * @param {NextFunction} next - Express next middleware function.
 */
export const getEmployees = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const {
      page = 1,
      limit = 10,
      departmentId,
      role,
      employmentStatus,
      search,
      sortBy = "createdAt",
      sortOrder = "desc",
    } = req.query as any;

    const pageNum = Number(page);
    const limitNum = Number(limit);
    const skip = (pageNum - 1) * limitNum;

    // Tenant isolation: filter by the company of the authenticated user
    const query: Record<string, any> = {
      companyId: req.user.companyId,
    };

    if (departmentId) {
      query.departmentId = departmentId;
    }

    if (role) {
      query.role = role;
    }

    if (employmentStatus) {
      query.employmentStatus = employmentStatus;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }

    const sortDirection = sortOrder === "asc" ? 1 : -1;
    const sortOptions: Record<string, 1 | -1> = {
      [sortBy as string]: sortDirection,
    };

    const [total, employees] = await Promise.all([
      User.countDocuments(query),
      User.find(query)
        .select("-password")
        .populate("departmentId", "name")
        .populate("managerId", "name email")
        .sort(sortOptions)
        .skip(skip)
        .limit(limitNum),
    ]);

    const totalPages = Math.ceil(total / limitNum) || 1;

    res.status(200).json({
      success: true,
      data: {
        employees,
        pagination: {
          total,
          page: pageNum,
          limit: limitNum,
          totalPages,
          hasNextPage: pageNum < totalPages,
          hasPrevPage: pageNum > 1,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};
