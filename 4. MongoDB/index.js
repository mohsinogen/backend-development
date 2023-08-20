// Importing packages
import express, { json } from "express";
import cors from "cors"
import dotenv from "dotenv"
import connectDB from "./config/db.js";
import colors from "colors";

// importing routes
import userRoutes from "./routes/userRoutes.js"
import { notFound } from "./middlewares/notFoundMiddleware.js";
import { errorHandler } from "./middlewares/errorMiddleware.js";

// importing middlewares

dotenv.config();
connectDB();

const app = express();

app.use(json())
app.use(cors());

app.get('/',(req,res)=>{
  res.json({code:200, remark:'success',data:null})
})


app.use('/users', userRoutes)

app.use(notFound);
app.use(errorHandler)

const PORT = process.env.PORT || nul
app.listen(PORT,()=>{
  console.log(`Server is runnig on http://localhost:${PORT}`.yellow.underline);
})