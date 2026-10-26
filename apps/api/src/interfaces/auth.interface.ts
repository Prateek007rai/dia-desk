/**
 * Interface representing access and refresh token pair.
 */
export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

/**
 * Payload interface for token refresh request.
 */
export interface RefreshTokenPayload {
  refreshToken: string;
}

/**
 * Payload interface for user logout request.
 */
export interface LogoutPayload {
  refreshToken?: string;
}

/**
 * Standard response interface for logout action.
 */
export interface LogoutResponse {
  success: boolean;
  message: string;
}

/**
 * User profile details returned by getMe endpoint.
 */
export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: string;
  companyId: string;
  designation: string;
  employmentType: string;
  employmentStatus: string;
  departmentId?: any;
  managerId?: any;
  phone?: string;
  avatar?: string;
  dob?: Date;
  gender?: string;
  joinDate: Date;
  isActive: boolean;
}

/**
 * Standard response interface for getMe endpoint.
 */
export interface GetMeResponse {
  success: boolean;
  data: {
    user: UserProfile;
  };
}


