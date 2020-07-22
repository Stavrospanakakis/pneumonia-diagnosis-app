FROM node:12.13.0-alpine as build

# SET THE WORK DIRECTORY
WORKDIR /web

# ADD DEPENDENCIES
RUN yarn global add serve
RUN yarn global add react-scripts

# COPY FILES TO THE WORK DIRECTORY
COPY web .

# INSTALL DEPENDENCIES
RUN yarn

# EXPORT THE PORT 3000
EXPOSE 3000

# BUILD THE APP
RUN yarn build

# RUN SERVER
CMD [ "serve", "-s", "build", "-l", "3000" ]