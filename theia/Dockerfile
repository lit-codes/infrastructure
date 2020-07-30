FROM theiaide/theia:next

USER root

RUN apk update && apk --no-cache add postgresql-client redis
RUN npm i -g parcel@next

RUN chown -R theia:$(id -gn theia) /home/theia/.config
USER theia
