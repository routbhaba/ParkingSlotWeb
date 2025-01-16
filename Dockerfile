# Stage 1: Build the Angular application
FROM node:16 AS build

WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./
RUN npm install

# Copy the entire project to the container
COPY . .

# Build the Angular app in production mode
RUN npm run build --prod

# Stage 2: Serve the application using NGINX
FROM nginx:stable

# Copy the built Angular app from the previous stage
COPY --from=build /app/dist/parking /usr/share/nginx/html

# Expose the default NGINX port
EXPOSE 80

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]
