FROM node:10-alpine

WORKDIR /opt
RUN apk --quiet --no-cache add --virtual native-deps \
bash g++ gcc libgcc libstdc++ linux-headers make python && \
apk del --quiet native-deps
