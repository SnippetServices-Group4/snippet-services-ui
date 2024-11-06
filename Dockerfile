# Step 1: Build the React app using Vite
FROM node:20 AS build

WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy project files
COPY . .

# Build the React app (produces static assets in the dist/ folder)
RUN npm run build

# Step 2: Prepare the assets for deployment
FROM alpine:latest

WORKDIR /app

# Copy only the built static assets to /app
COPY --from=build /app/dist /app
