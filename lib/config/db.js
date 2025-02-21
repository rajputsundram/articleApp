import mongoose from "mongoose"
const mongoURI=process.env.DB_URL;
export const connectDB=async()=>{
    await mongoose.connect(mongoURI);

    console.log("DB connetced")
}