FROM node:latest
WORKDIR /usr/src/app
COPY package*.json ./
RUN yarn install
EXPOSE 8080
COPY . .
CMD ["node", "src/index.js"]

