FROM node:latest

WORKDIR /app

COPY . .

RUN npm install

ENV HELLO_MESSAGE=Namaste\ India

EXPOSE 3000

RUN npm run bdev

CMD ["npm", "run", "dev"]
