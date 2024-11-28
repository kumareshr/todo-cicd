# Stage 1: Build the React app
FROM node:20.5-alpine as build
# Set working directory
WORKDIR /app

# Install required build tools and Python
RUN apk add --no-cache python3 make g++ \
    && ln -sf python3 /usr/bin/python  # Ensure Python points to python3

# Add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# Upgrade npm to the latest version
RUN npm install -g npm@10.9.1

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy the rest of the app files
COPY . ./

# Build the app for production
RUN npm run build

# Stage 2: Serve the app using nginx
FROM nginx:stable-alpine

# Copy built files from the previous stage to nginx's default directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 to the outside world
EXPOSE 80

# Start nginx server
CMD ["nginx", "-g", "daemon off;"]
