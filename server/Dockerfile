FROM node:18-alpine

WORKDIR /zawilian/server

COPY package.json .

ARG NODE_ENV
RUN if [ "$NODE_ENV" = "production"]; \
    then npm install --only=production; \
    else npm install; \
    fi

COPY . .