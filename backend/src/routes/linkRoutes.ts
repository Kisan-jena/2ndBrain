import express from 'express';
import { createShareableLink, getSharedBrain } from '../controllers/linkController';

const linkRouter = express.Router();

linkRouter.post('/share', createShareableLink);
linkRouter.get('/:shareLink', getSharedBrain);

export default linkRouter;