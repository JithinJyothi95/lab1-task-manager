FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 5000

CMD ["sh", "-c", "until nc -z mysql-db 3306; do echo waiting for db...; sleep 2; done && node server.js"]
