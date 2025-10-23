import express from 'express';
import {  getAllTags} from '../controllers/tagController';

const tagRouter = express.Router();

tagRouter.get('/get', getAllTags);

export default tagRouter;