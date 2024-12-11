import express from 'express';
import path from 'path';
import multer from 'multer';
import  { performOCR }  from './ocrTesseract.js';
import { performOCRSpace } from './ocrSpace.js';

const app = express();
const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: function (req, file, cb) {
      const ext = path.extname(file.originalname) || '.png'; 
      cb(null, file.fieldname + '-' + Date.now() + ext);     
    }
  });
  
const upload = multer({ storage });

app.use(express.static('public'));


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/index.html'));
});

app.post('/ocr/tesseract',upload.single('image'), async (req, res) => {
    const text = await performOCR(req.file.path);
    res.send({ text });
});

app.post('/ocr/ocrspace', upload.single('image'), async (req, res) => {
    const text = await performOCRSpace(req.file.path);
    res.send({ text });
});

app.listen(3000, () => console.log(`Servidor rodando na porta 3000`))