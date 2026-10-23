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
