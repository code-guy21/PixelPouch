FROM node:14-alpine

ENV NODE_ENV=production

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 3001

EXPOSE 9299

CMD ["node", "server.js"]