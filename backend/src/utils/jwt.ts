import jwt, { SignOptions } from 'jsonwebtoken';
import { env } from '../config/env';

export type TokenPayload = {
  id: string;
  role: string;
};

export const generateAccessToken = (payload: TokenPayload): string => {
  return jwt.sign(payload, env.JWT_SECRET, { 
    expiresIn: env.JWT_EXPIRES_IN as SignOptions['expiresIn'] 
  });
};

export const generateRefreshToken = (payload: TokenPayload): string => {
  return jwt.sign(payload, env.JWT_REFRESH_SECRET, { 
    expiresIn: env.REFRESH_EXPIRES_IN as SignOptions['expiresIn'] 
  });
};

export const verifyAccessToken = (token: string): TokenPayload => {
  return jwt.verify(token, env.JWT_SECRET) as TokenPayload;
};

export const verifyRefreshToken = (token: string): TokenPayload => {
  return jwt.verify(token, env.JWT_REFRESH_SECRET) as TokenPayload;
};