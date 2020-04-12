# Install the container's OS
FROM node:11-alpine

# set working directory
WORKDIR /app

COPY . .

RUN mv .env.example .env

# Install dependencies and build the static files
RUN npm install
RUN npm run build

# The container will listen on port 3000 using the TCP protocol.
EXPOSE 3000

# Run app
CMD [ "npm", "start" ]
