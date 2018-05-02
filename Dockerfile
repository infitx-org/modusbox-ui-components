FROM node:9.11-alpine

RUN mkdir -p /usr/local/code
WORKDIR /usr/local/code


COPY package.json /usr/local/code/
COPY yarn.lock /usr/local/code/

RUN yarn install

COPY . /usr/local/code/

EXPOSE 8080
EXPOSE 8081

ENTRYPOINT ["yarn"]
CMD ["run", "test"]
