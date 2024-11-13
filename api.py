from flask import Flask, request, jsonify
from flask_cors import CORS 
import easyocr

app = Flask(__name__)
CORS(app)
reader = easyocr.Reader(['pt'])  # Inicie o leitor com o idioma inglês, você pode adicionar outros idiomas

@app.route('/ocr', methods=['POST'])
def ocr():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    
    # Usando EasyOCR para realizar o OCR
    result = reader.readtext(file.read())
    
    # Formatando o resultado
    text = '\n'.join([item[1] for item in result])

    return jsonify({'text': text})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
