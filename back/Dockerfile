# Run Server API
FROM node:latest

LABEL maintainer="hassani20120@gmail.com"

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
RUN npm install 
RUN npm config set registry http://registry.npmjs.org/
COPY . ./


# Main command
CMD [ "npm","run","start-docker"]