import mongoose from "mongoose";

const tagSchema=new mongoose.Schema({
    title:{type:String,required:true,unique:true}
});

export const TagModel=mongoose.models.tag || mongoose.model("tag",tagSchema) ;