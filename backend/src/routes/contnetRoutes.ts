import express from 'express'
import { deleteContent, addContent, updateContent, getContent } from '../controllers/contentController'
import authuser from "../middlewares/userAuth.ts";

const contentRouter = express.Router();


contentRouter.post('/add',authuser, addContent)
contentRouter.get('/get',authuser, getContent)
contentRouter.put('/:id',authuser, updateContent)
contentRouter.delete('/:id',authuser, deleteContent)

export default contentRouter