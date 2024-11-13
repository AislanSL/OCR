# Use a imagem Python como base
FROM python:3.8-slim

# Atualizar pip
RUN pip install --upgrade pip

# Instalar EasyOCR e suas dependências
RUN pip install easyocr

# Instalar Flask para a API
RUN pip install flask flask-cors

# Configurar diretório de trabalho
WORKDIR /app

# Copiar os arquivos necessários (caso tenha algum script adicional)
COPY . /app

# Expor a porta 5000 (para a API do Flask)
EXPOSE 5000

# Iniciar a API quando o container for iniciado
CMD ["python", "api.py"]