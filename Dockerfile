FROM node:18-alpine

WORKDIR ./app

COPY package.json package-lock.json ./

RUN npm install

COPY jsconfig.json remix.config.js server.js ./

COPY ./app ./app

RUN npm run build

CMD ["npm", "start"]
