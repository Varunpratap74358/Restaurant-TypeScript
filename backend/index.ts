import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import { connectDB } from './db/dataBase'
import bodyParser = require('body-parser')
import userRoute from './routes/userRoute'
import restaruantRoute from './routes/restaruantRoute'
import menuRoute from './routes/menuRoute'
import orderRoute from './routes/orderRoute'


dotenv.config()
const app = express()
const port = process.env.PORT
connectDB()//databsce cponnection

app.use(cookieParser())
app.use(bodyParser.json({limit:'10mb'}))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors({
    origin:true,
    methods:['GET','PUT','POST','DELETE'],
    credentials:true
}))

//routes
app.use("/api/v1/user",userRoute)
app.use("/api/v1/restaruant",restaruantRoute)
app.use("/api/v1/menu",menuRoute)
app.use("/api/v1/order",orderRoute)

app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})