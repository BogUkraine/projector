# Stage 1: Build the application
FROM node:20.13 as build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Run the application
FROM node:20.13
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY --from=build /app/dist ./dist
COPY .env ./
EXPOSE 8000

# Command to run the application
CMD ["node", "dist/src/main"]