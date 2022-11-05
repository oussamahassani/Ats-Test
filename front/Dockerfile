FROM node:16
WORKDIR /app
COPY . .
RUN npm install &&  npm run build && cp -r  ./build/ ../back/public  && cd ../back && npm install   

EXPOSE 8684

 