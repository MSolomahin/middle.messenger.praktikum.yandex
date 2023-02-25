FROM node:16-slim as dev
RUN mkdir "app"
WORKDIR app
COPY ./package*.json .
COPY . .
RUN yarn install
EXPOSE 3000
CMD ["yarn", "start"]
