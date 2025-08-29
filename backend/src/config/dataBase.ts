import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config()

export const connectToDb=async()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URL as string)
        console.log("DB connected succesfully")
    }catch(error){
        console.log("MongoDB connection error",error)
    }
}