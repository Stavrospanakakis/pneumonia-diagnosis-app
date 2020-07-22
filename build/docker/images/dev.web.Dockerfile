FROM node:12.13.0-alpine

# SET THE WORK DIRECTORY
WORKDIR /web

# ADD DEPENDENCIES
RUN yarn global add @testing-library/jest-dom
RUN yarn global add serve
RUN yarn global add react-scripts

# COPY FILES TO THE WORK DIRECTORY
COPY web .

# INSTALL DEPENDENCIES
RUN yarn

# EXPORT THE PORT 3000
EXPOSE 3000

# SET ENVIRONMENT VARIABLES FOR INTERNAL VALUES
ARG UID
ARG GID

# RUN SERVER
CMD [ "yarn", "start" ]