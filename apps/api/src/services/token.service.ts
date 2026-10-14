import jwt from "jsonwebtoken";
import { env } from "../config/env";

export interface TokenPayload {
  id: string;
  role: string;
  companyId: string;
}

export const generateAccessToken = (payload: TokenPayload): string => {
  // TODO: implement access token generation
  return "";
};

export const generateRefreshToken = (payload: TokenPayload): string => {
  // TODO: implement refresh token generation
  return "";
};
