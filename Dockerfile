# Step 1: Build the React app using Vite
FROM node:20 AS build

WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy project files
COPY . .

# Inject environment variables for the React build
ARG VITE_AUTH0_DOMAIN
ARG VITE_AUTH0_CLIENT_ID
ARG VITE_AUTH0_AUDIENCE
ARG VITE_BACKEND_URL

# Make the environment variables available at build time
ENV VITE_AUTH0_DOMAIN=${VITE_AUTH0_DOMAIN}
ENV VITE_AUTH0_CLIENT_ID=${VITE_AUTH0_CLIENT_ID}
ENV VITE_AUTH0_AUDIENCE=${VITE_AUTH0_AUDIENCE}
ENV VITE_BACKEND_URL=${VITE_BACKEND_URL}

# Build the React app (produces static assets in the dist/ folder)
RUN npm run build

# Step 2: Serve the built assets with Nginx
FROM nginx:alpine

# Copy built assets to Nginx's default root directory
COPY --from=build /app/dist /usr/share/nginx/html

# Copy custom Nginx configuration
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 80

# Start Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
