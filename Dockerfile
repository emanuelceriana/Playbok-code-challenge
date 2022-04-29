FROM node:fermium

RUN npm install -g ts-node

WORKDIR /usr/src/app

COPY ./package.json ./

COPY ./ ./

CMD ["npm", "run", "test:start"]
