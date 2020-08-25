FROM node:14.8.0-alpine3.10

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY . .

RUN npm install --quiet

EXPOSE 3000

CMD ["npm", "run", "start"]