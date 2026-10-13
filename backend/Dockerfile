FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install --legacy-peer-deps \
    && npm install pg sharp --save

COPY . .

EXPOSE 1337

CMD ["npm", "run", "develop"]
