# Step 1: Build the React app using Vite
FROM node:18 AS build

WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy project files
COPY . .

# Build the React app (produces static assets in the dist/ folder)
RUN npm run build

# Step 2: Use multi-stage to copy built assets to a new folder
FROM alpine:latest

WORKDIR /usr/share/nginx/html

# Copy the built app from the build stage
COPY --from=build /app/dist/ .
