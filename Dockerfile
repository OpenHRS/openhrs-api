FROM node:latest

WORKDIR /usr/app

COPY ./package.json .
RUN npm install --quiet
RUN npm install forever -g --quiet

COPY ./server.js .
COPY ./config.js .
COPY src/ /usr/app/src/
