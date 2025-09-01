import { UserModel } from "../models/userModel";
import bcrypt from 'bcrypt';
import jwt  from "jsonwebtoken";
import { z } from 'zod';
import type { Request, Response } from 'express';
import { HttpStatusCode,ResponseMessage } from '../types/enums'
import { env } from "../config/env"


const requireBody=z.object({
    name: z.string().min(3).max(100),
    email: z.string().min(3).max(100).email(),
    password: z.string().min(3).max(30),
})

const createToken=(id:string|number)=>{
    return jwt.sign({id}, env.JWT_SECRET)
}

// Sign Up
const registerUser=async(req: Request,res: Response)=>{
    const {name,email,password}=req.body
    try{
        const parseData = requireBody.safeParse(req.body);
        console.log(requireBody.safeParse(req.body))
        // console.log(requireBody.parse(req.body))

        if (!parseData.success){
            return res.status(400).json({success:false,message:ResponseMessage.INVALID_CREDENTIALS})
        }

        const emailAllreadyExsits=await UserModel.findOne({email:parseData.data.email})
        if (emailAllreadyExsits){
            return res.status(HttpStatusCode.CONFLICT).json({success:false,message:"user already exist"})
        }

        const hashPass=await bcrypt.hash(parseData.data.password,10)

        const user = await UserModel.create({
            name: parseData.data.name,
            email: parseData.data.email,
            password: hashPass
        });

        return res.status(HttpStatusCode.CREATED).json({
            success: true,
            message: "User registered successfully",
            
            user: {
                id: user._id,
                username: user.name,
                email: user.email
            }
        });
        
    } catch (error) {
        console.error('Registration error:', error);
        return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Registration failed"
        });
    }
}

// SignIn
const loginUser=async(req: any,res: any)=>{
    console.log('login user cont')
}

export {loginUser,registerUser}


