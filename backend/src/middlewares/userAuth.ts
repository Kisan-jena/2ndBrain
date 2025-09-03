// import jwt from 'jsonwebtoken' 
// import {env} from "../config/env"
// import type { NextFunction } from 'express';
// import type { Request, Response } from 'express';
// import { HttpStatusCode, ResponseMessage } from '../types/enums';

// export interface AuthRequest extends Request {
//   user?: any;
// }

// // Verify Access Token Middleware
// export const authUser = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const authHeader = req.headers.authorization;

//     if (!authHeader || !authHeader.startsWith('Bearer ')) {
//       return res.status(HttpStatusCode.UNAUTHORIZED).json({
//         success: false,
//         message: ResponseMessage.UNAUTHORIZED,
//       });
//     }

//     const token = authHeader.split(' ')[1]; // Extract token
//     // const decoded = jwt.verify(token, env.JWT_SECRET) as { id: string };
//     // req.user = decoded;
//     next();

//   } catch (error: unknown) {
//     const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
//     res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
//       success: false,
//       message: ResponseMessage.INTERNAL_ERROR,
//       error: errorMessage,
//     });
//   }
// }