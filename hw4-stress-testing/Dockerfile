# Stage 1: Build environment
FROM node:20 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Stage 2: Production image
FROM node:20 AS server

WORKDIR /app

COPY package* ./
RUN npm install

COPY --from=builder /app/dist ./dist

EXPOSE 8000

CMD npm run migration:prod:run; npm run prod