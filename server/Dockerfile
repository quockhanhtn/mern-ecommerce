#  Dockerfile for Node Express Backend api (production)

FROM node:14.15.3-alpine3.12

ARG NODE_ENV=production

# Create App Directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# copy package*.json and install dependencies
COPY package*.json ./
RUN npm install

# copy app source code
COPY . .

# exports
EXPOSE 3001

CMD ["npm","start"]