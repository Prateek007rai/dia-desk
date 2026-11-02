import { IUser } from "./user.interface";

/**
 * Standard pagination metadata structure.
 */
export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

/**
 * Filter parameters for querying employee lists.
 */
export interface EmployeeFilterQuery {
  departmentId?: string;
  role?: string;
  employmentStatus?: string;
  search?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

/**
 * Standard response structure for paginated employee listing.
 */
export interface PaginatedEmployeesResponse {
  success: boolean;
  data: {
    employees: IUser[];
    pagination: PaginationMeta;
  };
}
