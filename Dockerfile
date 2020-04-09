# Install the container's OS
FROM node:11-alpine

# set working directory
WORKDIR /app

COPY package*.json ./

COPY . .

# Install dependencies and build the static files
RUN npm install --production

# The container will listen on port 80 using the TCP protocol.
EXPOSE 3000

# Run app
CMD [ "npm", "start" ]
