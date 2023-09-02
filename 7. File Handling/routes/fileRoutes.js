import path from 'path'
import express from 'express'
import multer from 'multer'
const router = express.Router()

const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(null, uniqueSuffix + path.extname(file.originalname));
    },
  });


const upload = multer({ storage: storage });


router.post('/', upload.single('file'), (req, res) => {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    return res.status(200).json({ message: 'File uploaded successfully' });
})

export default router