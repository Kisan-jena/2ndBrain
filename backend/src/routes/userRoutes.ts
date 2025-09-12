import express  from "express";
import { loginUser, logoutUser, registerUser,refreshAccessToken } from '../controllers/userController'

const userRouter=express.Router();

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser);
userRouter.post('/getAccessToken', refreshAccessToken);
userRouter.post('/logout', logoutUser);

export default userRouter;

