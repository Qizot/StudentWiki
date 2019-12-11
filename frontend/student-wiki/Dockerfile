# base image
FROM node:10.15.2-alpine as build
# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /app/package.json
RUN npm install

# add app
COPY . /app

# generate build
ARG configuration=production
RUN npm run build -- --output-path=./dist/out --configuration $configuration

# base image
FROM nginx:1.15
COPY --from=build /app/dist/out/ /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

