FROM node:16-slim as dev

RUN mkdir "app"
WORKDIR app

COPY ./package.json .
COPY ./package-lock.json .
COPY . .

RUN npm ci

EXPOSE 3000

CMD ["npm", "run", "start"]
