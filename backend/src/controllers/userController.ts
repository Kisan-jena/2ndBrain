import { UserModel } from "../models/userModel";
import bcrypt from 'bcrypt';
import Jwt  from "jsonwebtoken";

const registerUser=async(req: any,res: any)=>{
    console.log('register user cont')
    res.json({message:"register user cont"})
}

const loginUser=async(req: any,res: any)=>{
    console.log('login user cont')
}

export {loginUser,registerUser}


