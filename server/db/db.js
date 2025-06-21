import mongoose from "mongoose"


export const db=async()=>{
try {
    const conn=await mongoose.connect(process.env.MONGO_URI,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    })
    console.log("MongoDB connected");
} catch (error) {
    console.error("Database connection failed:", error.message);
    process.exit(1); // Exit the process with failure
}



}