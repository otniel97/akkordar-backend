FROM node:12.18 As development

WORKDIR /app

COPY package.json ./

RUN npm install

ADD . ./

EXPOSE 3000

CMD ["npm", "run", "start:dev"]