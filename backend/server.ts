import express from "express";
import cors from 'cors'

const app=express()
const port=3000

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    res.json({ message: "Server is running!" })
})

app.listen(
    port,
    ()=>console.log(`server started on http://localhost:${port}`)
)