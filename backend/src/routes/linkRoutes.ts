import express from 'express';
import {
  createShareableLink,
  getSharedBrain,
} from '../controllers/linkController';
import authuser from '../middlewares/userAuth';

const linkRouter = express.Router();

linkRouter.post('/create', authuser, createShareableLink);
linkRouter.get('/:shareLink', getSharedBrain);

export default linkRouter;
