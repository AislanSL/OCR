import { ocrSpace } from "ocr-space-api-wrapper";

export async function performOCRSpace(imagePath) {
  try {

    const response = await ocrSpace(imagePath, {
      apiKey: '<K84510467188957>', 
      language: 'por',           
    });

   
    if (response.OCRExitCode !== 1) {
      throw new Error('Falha no OCR Space: ' + (response.ErrorMessage || 'Erro desconhecido'));
    }

    return response.ParsedResults[0].ParsedText;  
  } catch (error) {
    console.error('Erro ao usar OCR Space:', error);
    throw error;
  }
}

