FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install

COPY . .

RUN npm run build

RUN npm run prisma:generate

EXPOSE 8080

CMD ["npm", "run prisma:deploy && npm run prisma:reset && npm start"]
