import type { NextFunction, Request, Response } from 'express';
import jwt, { type JwtPayload } from 'jsonwebtoken';
import { env } from '../config/env';
import { HttpStatusCode, ResponseMessage } from '../types/enums';

interface AuthRequest extends Request {
  userId?: string;
}

const authuser = (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    // receive token from headers qith Bearer
    const authHeader = req.headers.authorization;
    console.log('authHeader:', authHeader);

    // extracting token from bearer string;
    const token = authHeader?.split(' ')[1];
    console.log('token:', token);
    if (!token) {
      return res.status(HttpStatusCode.UNAUTHORIZED).json({
        success: false,
        message: ResponseMessage.UNAUTHORIZED + 'please login again',
      });
    }

    // verify token
    const decoded = jwt.verify(token, env.JWT_ACCESS_SECRET) as JwtPayload;
    console.log('decoded:', decoded);

    if (decoded && decoded.type === 'access' && typeof decoded.userId === 'string') {
      req.userId = decoded.userId;
      console.log('req.userId:', req.userId);
    } else {
      return res.status(HttpStatusCode.UNAUTHORIZED).json({
        success: false,
        message: ResponseMessage.UNAUTHORIZED + ' Invalid token structure.',
      });
    }
    next();
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'An unknown error occurred';
    console.error('JWT Error:', errorMessage);
    return res.status(HttpStatusCode.UNAUTHORIZED).json({
      success: false,
      message: ResponseMessage.UNAUTHORIZED + ' invalid token',
      error: errorMessage,
    });
  }
};

export default authuser;
