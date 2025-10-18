import express from 'express';
import {
  loginUser,
  logoutUser,
  refreshAccessToken,
  registerUser,
} from '../controllers/userController';

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.get('/getAccessToken', refreshAccessToken);
userRouter.post('/logout', logoutUser);

export default userRouter;


