import { ocrSpace } from "ocr-space-api-wrapper";

export async function performOCRSpace(imagePath) {
  try {

   
    
    // Chamando o OCR Space com a imagem local e a chave de API
    const response = await ocrSpace(imagePath, {
      apiKey: '<K84510467188957>',  // Substitua pela sua chave de API pessoal
      language: 'por',           // Configura o OCR para português
    });

    console.log("AAAAAAAAAAAAAAAAAAA", imagePath);

    // Verifica se houve erro no OCR
    if (response.OCRExitCode !== 1) {
      throw new Error('Falha no OCR Space: ' + (response.ErrorMessage || 'Erro desconhecido'));
    }

    return response.ParsedResults[0].ParsedText;  // Retorna o texto extraído
  } catch (error) {
    console.error('Erro ao usar OCR Space:', error);
    throw error;
  }
}

