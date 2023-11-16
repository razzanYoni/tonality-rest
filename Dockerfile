FROM node:18.18.2-alpine

WORKDIR /tonality/tonality-rest

COPY package*.json .

RUN npm install

COPY . .

RUN npx prisma generate

CMD ["sh", "-c", "npx prisma migrate deploy && npm run build-start"]
