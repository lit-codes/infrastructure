FROM node:10-alpine

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install
COPY . .
WORKDIR /usr/src/app/dashboard-app
RUN npm install
RUN npm run build
WORKDIR /usr/src/app
EXPOSE 4000

CMD ["index.js"]

