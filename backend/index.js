import express from "express";
import { urlencoded } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import path from "path";
import allRoute from "./routes/all.route.js" 
import dotenv from "dotenv";
import connectDB from "./config/db.js";
dotenv.config();

const app = express();


const PORT = process.env.PORT || 8000;
const __dirname = path.resolve();



app.use(express.json());
app.use(cookieParser());

app.use(urlencoded({ extended: true }));
const corsOptions = {
  origin: ["http://localhost:5173","https://nexoralaptop-vd6k.vercel.app/"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  exposedHeaders: ["set-cookie"],
};
app.use(cors(corsOptions));


// API Routes
app.use("/api/all",allRoute );

app.listen(PORT, () => {
  connectDB();
  console.log(`Server running at port ${PORT}`);
});
