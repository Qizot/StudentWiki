FROM node:10.15.2-alpine
 
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json ./

RUN apk --no-cache --virtual build-dependencies add \
    python \
    make \
    g++ \
    && npm install \
    && apk del build-dependencies
 
COPY . .
 
EXPOSE 3000
CMD ["npm", "start"]