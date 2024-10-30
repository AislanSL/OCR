function processImage() {
  const fileInput = document.getElementById('imageInput');
  if (!fileInput.file.length) {
    alert("Por favor, faça o upload de uma imagem");
    return;
  }
}

const formData = new FormData();
formData.append('image', fileInput.file[0]);

fetch('/process_image', {
  method: 'POST', 
  body: formData
})
.then(response => response.json())
.then(data => {
  document.getElementById('result').innerText = data.text;
})
.catch(error => console.error('Erro:', error));