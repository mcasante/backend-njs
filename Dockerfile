FROM node:20-alpine

RUN apk update && apk add --no-cache bash

WORKDIR /home/app

COPY . .

ENV PATH /home/app/node_modules/.bin:$PATH

RUN npm cache clean --force
RUN npm install -g npm@^10.8.1 --silent
RUN npm install -g pnpm@^9.3.0 --silent

# Need to change the default store location to avoid permission errors
# https://github.com/pnpm/pnpm/issues/5803#issuecomment-1974820613
RUN pnpm config set store-dir /home/node/.local/share/pnpm/store
