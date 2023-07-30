import express from "express";
import cors from "cors"
import dotenv from "dotenv"
// importing routes
import userRoutes from "./routes/userRoutes.js"

const app = express();

dotenv.config();


app.use(cors());


app.get('/',(req,res)=>{
  res.json({code:200, remark:'success',data:null})
})


app.use('/users', userRoutes)


const PORT = process.env.PORT
app.listen(PORT,()=>{
  console.log(`Server is runnig on http://localhost:${PORT}`);
})