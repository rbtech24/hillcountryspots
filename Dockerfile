FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies (including dev dependencies for building)
RUN npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Copy attached assets to dist folder
RUN cp -r attached_assets dist/

# Clean install production dependencies only
RUN rm -rf node_modules && npm ci --only=production

# Expose port
EXPOSE 5000

# Start the application
CMD ["npm", "start"]