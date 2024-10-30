import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();

app.use(express.static('public'));
app.set('view engine', 'html');

const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/index.html'));
});


app.listen(3000, () => console.log(`Servidor rodando na porta 3000`))