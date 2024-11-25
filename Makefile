install:
	npm install 

dev:
	npm run dev 


start-express: install dev


build:
	docker build -t easyocr . 

container:
	docker run -p 5000:5000 easyocr

start-container: build container



