import express from "express";
import cors from 'cors'
import {connectToDb} from './config/dataBase.ts'
import userRouter from "./routes/userRoutes.ts";
import contentRouter from './routes/contnetRoutes.ts';
import linkRouter from './routes/linkRoutes';
import tagRouter from './routes/tagRoutes';



const app=express()

// app config
connectToDb()

// middlewares
app.use(express.json())
app.use(cors())


// api end points
app.use('/api/v1/user',userRouter)
app.use('/api/v1/content',contentRouter)
app.use('/api/v1/brain', linkRouter);
app.use('/api/v1/tags', tagRouter);



app.get('/', (req, res)=> {
    res.json({ message: "Server is running!" })
})

export default app