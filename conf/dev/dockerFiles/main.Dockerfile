FROM node:18-alpine

WORKDIR /var/www/api.schoolmeals.d

COPY package*.json ./

RUN npm install

COPY . .

COPY ./dist ./dist

CMD [ "npm", "run", "start_d:dev" ]