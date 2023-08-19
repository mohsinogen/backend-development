import express from "express"
import { home } from "./controllers/homeController.js";
import userRoutes from "./routes/userRoutes.js"
import morgan from "morgan";
import colors from "colors"
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

dotenv.config()

connectDB();


const app = express();
app.use(express.json())
app.use(morgan('dev'))

app.get('/',home);

app.use("/users", userRoutes)

const PORT = process.env.PORT
app.listen(PORT,()=>{
  console.log(`Server is running on port ${PORT}`.yellow.underline);
});