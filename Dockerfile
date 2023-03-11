FROM node:16-slim as dev

RUN mkdir "app"
WORKDIR app

COPY . .

RUN npm ci
RUN npm run build

EXPOSE 3000

CMD ["node", "server.js"]
