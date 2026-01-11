# Use Node 22 (LTS) to satisfy Vite 7 requirements
FROM node:22-alpine

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application
COPY . .

# Expose the port Vite is running on
EXPOSE 3000

# Run Vite with --host 0.0.0.0 so it is accessible outside the container
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "3000"]