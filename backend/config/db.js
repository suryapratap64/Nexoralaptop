import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const connectDB=async ()=>{
  
    try {
          const res=await mongoose.connect(process.env.MONGO_URI,{ useNewUrlParser: true, useUnifiedTopology: true });
          if(res){
            console.log("mongodnb connected successfully");
          }
        
    } catch (error) {
        console.log("Error aa gaya hai",error);
        
    }

}
export default connectDB;