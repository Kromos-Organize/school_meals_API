FROM node:16.14.2

WORKDIR /

COPY package.json ./
COPY yarn.lock ./

RUN npm install

COPY . .

COPY ./dist ./dist

CMD ['npm', 'run','start']