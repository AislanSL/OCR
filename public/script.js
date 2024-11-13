async function processImage(system) {
  let formData = new FormData();
  const imageInput = document.getElementById('imageInput');
  if (!imageInput.files.length) {
      alert('Por favor, selecione uma imagem.');
      return;
  }

  

  const easyOcrUrl = 'http://localhost:5000/ocr';

  let endpoint;
  if (system === 'tesseract') {
      endpoint = '/ocr/tesseract';
      formData.append('image', imageInput.files[0]);
  } else if (system === 'ocrspace') {
      endpoint = '/ocr/ocrspace';
      formData.append('image', imageInput.files[0]);
  } else if (system === 'easyocr') {
      endpoint = easyOcrUrl
      formData.append('file', imageInput.files[0]);
  }

  console.log(formData);
  

  try {
    const response = await fetch(endpoint,{ 
            method: 'POST', 
            body: formData 
        });

    if (!response.ok) {
        throw new Error(`Erro na API: ${response.statusText}`);
    }

    const data = await response.json();

    if (system === 'tesseract') {
        document.getElementById('tesseractResult').value = data.text;
    } else if (system === 'ocrspace') {
        document.getElementById('ocrspaceResult').value = data.text;
    } else if (system === 'easyocr') {
        document.getElementById('easyOcrResult').value = data.text;
    }
 } catch (error) {
    console.error('Erro ao processar a imagem:', error);
 }
}