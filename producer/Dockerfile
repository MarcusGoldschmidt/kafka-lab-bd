<<<<<<< HEAD
FROM node:10-alpine
=======
FROM node:alpine
>>>>>>> Adicionado consumers

RUN apk add --no-cache build-base python

USER node

RUN mkdir -p /home/node/app

WORKDIR /home/node/app

COPY --chown=node:node . .

RUN npm ci && npm run build

EXPOSE 3000

<<<<<<< HEAD
=======
RUN npm run build

>>>>>>> Adicionado consumers
ENTRYPOINT npm run start:prod
