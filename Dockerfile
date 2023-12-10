# Use the official AWS Lambda Node.js 20 runtime as a base image
FROM public.ecr.aws/lambda/nodejs:20.2023.11.12.08-arm64

# Set the working directory
WORKDIR /var/task

# Copy the Lambda function code and dependencies
COPY index.js ./
COPY Utils.js ./
COPY package.json ./
COPY package-lock.json ./

# Install Node.js dependencies
RUN npm ci --production

# Specify the Lambda handler (replace 'index.handler' with your actual handler)
CMD [ "index.handler" ]
