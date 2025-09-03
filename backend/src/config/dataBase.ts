import mongoose from "mongoose";
import { env } from "./env";

export const connectToDb = async () => {
    try{
        await mongoose.connect(env.MONGODB_URL)
        console.log("DB connected succesfully")
    }catch(error){
        console.log("MongoDB connection error",error)
    }
}