# Stage 1: Build the React app
FROM node:13.12.0-alpine as build

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the app files and build the app for production
COPY . ./
RUN npm run build

# Stage 2: Serve the app using nginx
FROM nginx:stable-alpine

# Copy built React app files
COPY --from=build /app/build /usr/share/nginx/html

# Copy custom nginx configuration and runtime script
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY replace-env.sh /docker-entrypoint.d/replace-env.sh

# Ensure the script is executable
RUN chmod +x /docker-entrypoint.d/replace-env.sh

# Set the entrypoint to the script
ENTRYPOINT ["/docker-entrypoint.d/replace-env.sh"]

# Expose port 80 and start NGINX
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
