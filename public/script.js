async function processImage(system) {
  const formData = new FormData();
  const imageInput = document.getElementById('imageInput');
  if (!imageInput.files.length) {
      alert('Por favor, selecione uma imagem.');
      return;
  }

  formData.append('image', imageInput.files[0]);

  const endpoint = system === 'tesseract' ? '/ocr/tesseract' : '/ocr/ocrspace';

  try {
      const response = await fetch(endpoint, { method: 'POST', body: formData });
      const data = await response.json();

      if (system === 'tesseract') {
          document.getElementById('tesseractResult').value = data.text;
      } else if (system === 'ocrspace') {
          document.getElementById('ocrspaceResult').value = data.text;
      }
  } catch (error) {
      console.error('Erro ao processar a imagem:', error);
  }
}