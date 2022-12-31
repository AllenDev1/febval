# Use Node image
FROM nikolaik/python-nodejs:python3.11-nodejs14-alpine AS ReactBuild

# Set working directory
WORKDIR /app

COPY Febval/package.json Febval/package-lock.json ./

# Install dependencies
RUN npm install

# Copy source files
COPY Febval .

# Build app
RUN npm run build

FROM nikolaik/python-nodejs:python3.11-nodejs14-alpine AS Production

# Set working directory
WORKDIR /app

COPY api/package.json api/package-lock.json ./

# Install dependencies
RUN npm install --only=production

# Copy source files
COPY api .

# Copy build files
COPY --from=ReactBuild /app/build ./public

# Expose port
EXPOSE 8080

# Start app
CMD ["node", "index.js"]