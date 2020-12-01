# pull official base image
FROM node:13.12.0-alpine

WORKDIR /app
COPY . /app
RUN npm install
RUN npm run build

CMD [ "npm", "start" ]
