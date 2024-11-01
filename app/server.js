import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import multer from 'multer';
import  { performOCR }  from './ocr.js';

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(express.static('public'));
app.set('view engine', 'html');

const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/index.html'));
});

app.post('/process_image', upload.single('image'), async (req, res) => {
    const filePath = req.file.path;
    try {
        const text = await performOCR(filePath);
        res.json({ text });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao processar a imagem' });
    }
});

app.listen(3000, () => console.log(`Servidor rodando na porta 3000`))