# Use the official Node.js image with a version that supports ES2020
FROM node:18-alpine as build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json (if you have one)
COPY package.json ./

# Install dependencies
RUN npm install

# Copy the entire project
COPY . .

# Build the project
RUN npm run build

# Use the same Node.js image for the server environment
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy built assets from the build stage
COPY --from=build /app .

# Expose the port Vite Preview uses by default
EXPOSE 3000

# Command to run your application
CMD ["npm", "run", "preview"]
