import express from 'express';
import { createTag, getAllTags} from '../controllers/tagController';

const tagRouter = express.Router();

tagRouter.post('/create', createTag);
tagRouter.get('/get', getAllTags);

export default tagRouter;