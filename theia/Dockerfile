FROM theiaide/theia:latest

USER root

RUN apk update && apk --no-cache add postgresql-client redis
RUN npm i -g parcel

USER theia
