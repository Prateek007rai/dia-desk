import jwt from "jsonwebtoken";
import { env } from "../config/env";

export interface TokenPayload {
  id: string;
  role: string;
  companyId: string;
}

export const generateAccessToken = (payload: TokenPayload): string => {
  return jwt.sign(payload, env.JWT_SECRET, {
    expiresIn: "15m",
  });
};

export const generateRefreshToken = (payload: TokenPayload): string => {
  return jwt.sign(payload, env.JWT_REFRESH_SECRET, {
    expiresIn: "7d",
  });
};
