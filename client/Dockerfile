# Dockerfile for client

ARG NODE_IMAGE=node:14.15.3-alpine3.12

# Stage 1: Build React app
FROM $NODE_IMAGE AS BUILD_IMAGE
WORKDIR /usr/app

COPY package*.json ./

## Install dependencies
RUN npm ci

## Copy local files to app and build react app
COPY . .
RUN npm run build


# Stage 2
FROM $NODE_IMAGE
WORKDIR /usr/app

## copy from build image
COPY --from=BUILD_IMAGE /usr/app/build ./build

## Install serve
RUN npm install -g serve

## export
EXPOSE 3000

CMD ["serve","-d build", "-l 3000"]