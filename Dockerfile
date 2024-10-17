# FROM node:18-alpine
FROM node@sha256:02376a266c84acbf45bd19440e08e48b1c8b98037417334046029ab585de03e2

WORKDIR /app

COPY package.json /app/
RUN npm install

COPY public/ /app/public
COPY src/ /app/src

ENTRYPOINT ["npm", "run"]


