FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build --prod

RUN npm install -g http-server

EXPOSE 4200
CMD ["http-server", "dist", "-p", "4200"]