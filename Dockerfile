FROM node:6.14-slim

WORKDIR /code

ENV PORT 80

COPY package.json /code/package.json

RUN npm install

COPY ./dist /code

CMD ["node", "./dist/app.js"]