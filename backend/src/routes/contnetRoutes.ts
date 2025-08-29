import express from 'express'
import {deleteContent,addContent,updateContent,getContent} from '../controllers/contentController'

const contentRouter=express.Router();

contentRouter.post('/add', addContent)
contentRouter.get('/get', getContent)
contentRouter.put('/:id', updateContent)
contentRouter.delete('/:id', deleteContent)

export default contentRouter