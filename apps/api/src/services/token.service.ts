import jwt from "jsonwebtoken";
import { env } from "../config/env";

/**
 * Payload interface for JWT tokens containing user identity information.
 */
export interface TokenPayload {
  id: string;
  role: string;
  companyId: string;
}

/**
 * Generates a short-lived JSON Web Token (Access Token) for authenticating API requests.
 *
 * @param {TokenPayload} payload - The user identity details to encode in the token.
 * @returns {string} Signed JWT access token string.
 */
export const generateAccessToken = (payload: TokenPayload): string => {
  return jwt.sign(payload, env.JWT_SECRET, {
    expiresIn: "15m",
  });
};

/**
 * Generates a long-lived JSON Web Token (Refresh Token) used to refresh expired access tokens.
 *
 * @param {TokenPayload} payload - The user identity details to encode in the token.
 * @returns {string} Signed JWT refresh token string.
 */
export const generateRefreshToken = (payload: TokenPayload): string => {
  return jwt.sign(payload, env.JWT_REFRESH_SECRET, {
    expiresIn: "7d",
  });
};

/**
 * Verifies and decodes an access token.
 *
 * @param {string} token - The JWT access token to verify.
 * @returns {TokenPayload} The decoded payload if token is valid.
 * @throws {JsonWebTokenError} If the token is invalid or expired.
 */
export const verifyAccessToken = (token: string): TokenPayload => {
  return jwt.verify(token, env.JWT_SECRET) as TokenPayload;
};

/**
 * Verifies and decodes a refresh token.
 *
 * @param {string} token - The JWT refresh token to verify.
 * @returns {TokenPayload} The decoded payload if token is valid.
 * @throws {JsonWebTokenError} If the token is invalid or expired.
 */
export const verifyRefreshToken = (token: string): TokenPayload => {
  return jwt.verify(token, env.JWT_REFRESH_SECRET) as TokenPayload;
};
