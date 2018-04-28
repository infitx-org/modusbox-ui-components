FROM node:9.11-alpine

RUN mkdir -p /usr/local/code
WORKDIR /usr/local/code


COPY package.json /usr/local/code/

RUN yarn install

COPY . /usr/local/code/

RUN yarn run test

RUN yarn build
