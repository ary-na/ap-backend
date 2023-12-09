# Use an official Node.js image
FROM node:16-alpine

WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install production dependencies
RUN npm ci --only=production

# Copy the application code
COPY . .

# Clean up unnecessary files (optional)
RUN rm -rf node_modules/.bin
RUN rm -rf test

# Lambda function runtime image
FROM amazonlinux:2

WORKDIR /var/task

# Copy from the build stage
COPY --from=0 /app .

# Set environment variables (if needed)
# ENV MY_ENV_VAR=value

# Lambda handler function
CMD ["index.handler"]
