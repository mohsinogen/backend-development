import  express  from "express";

// Importing routes
import userRoutes from './routes/userRoutes.js'

const app = express();

app.get('/', (req, res) => {
  res.status(200)
  .json({
    code: 200,
    remark:'success'
  })
})

app.use('/users', userRoutes)


const PORT=5000;
app.listen(PORT,()=>{
  console.log(`Server is running on http://localhost:${PORT}`);
})