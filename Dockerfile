# Use the official Node.js image for AWS Lambda
FROM amazonlinux:2 AS build

# Install Node.js and npm
RUN yum install -y amazon-linux-extras
RUN amazon-linux-extras install -y nodejs14

# Set the working directory
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

# Set the working directory
WORKDIR /var/task

# Copy from the build stage
COPY --from=build /app .

# Set environment variables (if needed)
# ENV MY_ENV_VAR=value

# Lambda handler function
CMD ["index.handler"]
