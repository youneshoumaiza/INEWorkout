# Use official Node.js image as base
FROM node:21.4.0-alpine

ENV NODE_ENV=production
# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY ["package.json" ,"package-lock.json" , "./"] 

# Install dependencies
RUN npm install --${NODE_ENV}

# Copy backend source code
COPY . .

# Expose port (change PORT based on your application)
EXPOSE 4000

# Command to run the backend server
CMD ["npm", "start"] 

