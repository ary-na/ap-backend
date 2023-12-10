FROM public.ecr.aws/lambda/nodejs:20.2023.11.12.08-arm64

# Set the working directory
WORKDIR /var/task

COPY app.js ./
COPY Utils.js ./
COPY package.json ./
COPY package-lock.json ./

# Install Node.js dependencies
RUN npm ci --production

CMD [ "app.handler" ]