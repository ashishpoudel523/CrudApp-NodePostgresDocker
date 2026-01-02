# Use an official node.js runtime as a parent image
FROM node:24-alpine


# Set the working directory in the container
WORKDIR /app


# Copy the package.json and the package-lock.json files to the container
COPY package*.json ./app

# Install the dependencies 