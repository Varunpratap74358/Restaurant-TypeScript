import mongoose from "mongoose";

export const connectDB=()=>{
    mongoose.connect(process.env.MONGOURL!).then(()=>{
        console.log("DB is connected")
    }).catch((err)=>console.log(err)) 
}