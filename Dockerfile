FROM node:16-slim as dev

RUN mkdir "app"
WORKDIR app

COPY ./package.json .
COPY ./yarn.lock .
COPY . .

RUN yarn install --frozen-lockfile

EXPOSE 3000

CMD ["yarn", "start"]
