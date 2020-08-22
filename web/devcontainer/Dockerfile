FROM node:10-alpine

WORKDIR /opt
COPY . .
RUN apk --quiet --no-cache add --virtual native-deps \
g++ gcc libgcc libstdc++ linux-headers make python && \
npm install -g parcel-bundler --unsafe && \
npm install --quiet && \
apk del --quiet native-deps

EXPOSE 4000

CMD ["index.js"]

