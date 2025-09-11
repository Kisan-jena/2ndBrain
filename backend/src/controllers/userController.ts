import { UserModel } from "../models/userModel";
import { RefreshTokenModel } from '../models/refreshTokenModel.ts';
import bcrypt from 'bcrypt';
import jwt, { type JwtPayload }  from "jsonwebtoken";
import { success, z } from 'zod';
import type { Request, Response } from 'express';
import { HttpStatusCode,ResponseMessage } from '../types/enums'
import { env } from "../config/env"
import type { ObjectId } from "mongoose";


const requireBody = z.object({
    name: z.string().min(3).max(100),
    email: z.string().min(3).max(100).email(),
    password: z.string()
        .min(8, 'Password must be at least 8 characters')
        .regex(/[A-Z]/, 'Must contain at least one uppercase letter')
        .regex(/[0-9]/, 'Must contain at least one number')
        .regex(/[\W_]/, 'Must contain at least one special character'),
});

// Generate Access Token / refresh token
const createAccessToken = (userId: string | ObjectId) => {
    return jwt.sign(
        { userId, type: 'access' },
        env.JWT_ACCESS_SECRET,
        { expiresIn: '15m', }
    );
};

const createRefreshToken = (userId: string | ObjectId) => {
    return jwt.sign(
        { userId, type: 'refresh' },
        env.JWT_REFRESH_SECRET,
        { expiresIn: '7d',}
    );
};

// Sign Up
const registerUser=async(req: Request,res: Response)=>{
    const {name,email,password}=req.body
    try{
        const parseData = requireBody.safeParse(req.body);
        // console.log(requireBody.safeParse(req.body))
        // console.log(requireBody.parse(req.body))

        if (!parseData.success){
            return res.status(400).json({
                success: false,
                message: ResponseMessage.INVALID_CREDENTIALS
            })
        }

        const emailAllreadyExsits=await UserModel.findOne({email:parseData.data.email})
        if (emailAllreadyExsits){
            return res.status(HttpStatusCode.CONFLICT).json({
                success: false,
                message: ResponseMessage.EMAIL_ALREADY_EXISTS
            })
        }
//         {
//     "name": "anjali new yadav",
//     "email": "Anjuyadav2@example.com",
//     "password": "Anjuyadav2@123"
        // }
        // "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OGMwNjBjMDRiNDFkMzE0MDhhYWRmNDEiLCJ0eXBlIjoiYWNjZXNzIiwiaWF0IjoxNzU3NDM4MTY1LCJleHAiOjE3NTc0MzgyMjV9.kxzG5pAExKCUtC_lMa6vckEV4IhDRJqtg6W0yPJnw2s",
        // "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OGMwNjBjMDRiNDFkMzE0MDhhYWRmNDEiLCJ0eXBlIjoicmVmcmVzaCIsImlhdCI6MTc1NzQzODE2NSwiZXhwIjoxNzU4MDQyOTY1fQ.uWChbY3FAiLtOIuMtGP27vntVjWvNE4b9JQVtLs9Yrc"

        const hashPass=await bcrypt.hash(parseData.data.password,10)

        const user = await UserModel.create({
            name: parseData.data.name,
            email: parseData.data.email,
            password: hashPass
        });

        return res.status(HttpStatusCode.CREATED).json({
          success: true,
          message: ResponseMessage.REGISTRATION_SUCCESS,
          data: {
            user: { id: user._id, username: user.name, email: user.email },
          },
        });
        
    } catch (error:unknown) {
        console.error('Registration error:', error);
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: ResponseMessage.INTERNAL_ERROR,
            error: errorMessage
        });
    }
}

// SignIn
const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });
        
        if (!user) {
            return res.status(HttpStatusCode.NOT_FOUND).json({
                success: false,
                message: ResponseMessage.INVALID_CREDENTIALS,
            });
        }
        
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(HttpStatusCode.FORBIDDEN).json({
                success: false,
                message: ResponseMessage.INVALID_CREDENTIALS,
            });
        }
        // Generate tokens
        const accessToken = createAccessToken(user._id as string | ObjectId);
        const refreshToken = createRefreshToken(user._id as string | ObjectId);
        
        // Save refresh token in DB
        await RefreshTokenModel.create({
            userId: user._id,
            token: refreshToken,
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
        });
        
        // Send tokens
        res.status(HttpStatusCode.OK).json({
            success: true,
            message: ResponseMessage.LOGIN_SUCCESS,
            data: {
                user: { id: user._id, username: user.name, email: user.email },
                accessToken,
                refreshToken, //  In production, send via HttpOnly Cookie
            },
        });
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: ResponseMessage.INTERNAL_ERROR,
            error: errorMessage,
        });
    }
}

const logoutUser = async (req:Request,res:Response) => {
    try {
        const { refreshToken } = req.body;
        if (!refreshToken) {
            return res.status(HttpStatusCode.BAD_REQUEST).json({
                success: false,
                message: ResponseMessage.BAD_REQUEST
            });
        }
        await RefreshTokenModel.deleteOne({ token: refreshToken });
        
        res.status(HttpStatusCode.OK).json({
            success: true,
            message:ResponseMessage.LOGOUT_SUCCESS
        })
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: ResponseMessage.INTERNAL_ERROR,
            error: errorMessage,
        });
    }
}

const refreshAccessToken = async (req: Request, res: Response) => {
    try {
        const { refreshToken } = req.body;
        if (!refreshToken) {
            return res.status(HttpStatusCode.BAD_REQUEST).json({
                success: false,
                message: 'Refresh token required',
            });
        }
        // Verify refresh token
        const decoded = jwt.verify(refreshToken, env.JWT_REFRESH_SECRET) as JwtPayload;
        console.log("---------------decoded-----------")
        console.log(decoded);
        console.log('----------------decoded----------');

        // Check if refresh token exists in DB;
        const tokenDoc = await RefreshTokenModel.findOne({ token: refreshToken });
        console.log('----------------tokenDoc----------');
        console.log(tokenDoc);
        console.log('----------------tokenDoc----------');
        if (!tokenDoc) {
            return res.status(HttpStatusCode.UNAUTHORIZED).json({
                success: false,
                message: 'Invalid refresh token',
            });
        }
        
        // Generate new access token;
        const newAccessToken = createAccessToken(decoded.userId);
        
        res.status(HttpStatusCode.OK).json({
            success: true,
            accessToken: newAccessToken,
        });
    } catch (error) {
        console.error('Refresh token error:', error);
        return res.status(HttpStatusCode.UNAUTHORIZED).json({
            success: false,
            message: 'Invalid or expired refresh token',
        });
    }
};

export {loginUser,registerUser,logoutUser,refreshAccessToken}


