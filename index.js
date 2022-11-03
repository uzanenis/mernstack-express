import dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'
import userRouter from "./Routers/userRouter.js";
import cors from 'cors'

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())
app.use("/users", userRouter)

app.listen(5050, () => {
    mongoose.connect(process.env.DB_CONNECTION_STRING)
        .then(() => console.log("Connected to DB"))
        .catch((err) => console.log(err))
})