import mongoose from "mongoose";

const LinkSchema=new mongoose.Schema({
    hash:{type:String,required:true},
    userId:{type:mongoose.Schema.Types.ObjectId, ref:"user",required:true}
});

export const LinkModel=mongoose.models.link || mongoose.model("link",LinkSchema) ;