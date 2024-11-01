import Tesseract from "tesseract.js";


export async function performOCR(filePath) {
    const { data: { text } } = await Tesseract.recognize(filePath, 'por');
    return text;
}

