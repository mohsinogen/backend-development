// importing packages
import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import cors from "cors"
import morgan from "morgan";
//
import { errorHandler, notFound } from "./middlewares/errorMiddleware.js";
//
import fileRoutes from './routes/fileRoutes.js'

dotenv.config();

// express configs
const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan('dev'))

app.get("/", (req, res) => {
  res.status(200).json({
    code: 200,
    remark: "success",
  });
});

app.use('/file', fileRoutes)
app.use('/files',express.static('uploads'))
// Middlewares
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`.yellow.underline);
});
