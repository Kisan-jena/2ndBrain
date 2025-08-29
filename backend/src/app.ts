import express from "express";
import cors from 'cors'
import {connectToDb} from './config/database'

const app=express()


// app config
app.use(express.json())
app.use(cors())
connectToDb()

app.get('/', (req, res) => {
    res.json({ message: "Server is running!" })
})

export default app