FROM node:alpine

RUN apk add --no-cache build-base python

USER node

RUN mkdir -p /home/node/app

WORKDIR /home/node/app

COPY --chown=node:node . .

RUN npm ci && npm run build

EXPOSE 3000

RUN npm run build

ENTRYPOINT npm run start:prod
