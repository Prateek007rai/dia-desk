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

