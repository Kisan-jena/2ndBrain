import { ContentModel } from "../models/contentModel";

const addContent=async(req:any,res:any)=>{
    console.log('add content')
    res.json({message:"add content cont"})
}

const getContent=async(req:any,res:any)=>{
    console.log('get content')
}

const updateContent=async(req:any,res:any)=>{
    console.log('update content')
}

const deleteContent=async(req:any,res:any)=>{
    console.log('delete content')
}

export {deleteContent,addContent,updateContent,getContent}
