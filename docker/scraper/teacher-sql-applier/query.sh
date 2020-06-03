#!/bin/bash

set -e

: ${REDIS_HOST:=shared-redis}
: ${REDIS_PORT:=6379}
: ${REDIS_CONNECTION:=redis://$REDIS_HOST:$REDIS_PORT}
: ${DB_HOST:=shared-db}
: ${DB_PORT:=5432}
: ${DB_USER:=user}
: ${DB_PASS:=pass}
: ${DB_NAME:=rmp}
: ${DB_CONNECTION:=postgres://$DB_HOST:$DB_PORT/$DB_NAME?user=$DB_USER&password=$DB_PASS}

output() {
    psql -d "$DB_CONNECTION"
}

input() {
    redis-cli -u $REDIS_CONNECTION brpop teacher_rating_sqls 0 | grep -v '^teacher_rating_sqls$'
}

error() {
    redis-cli -u $REDIS_CONNECTION -x --raw lpush failed_teacher_rating_sqls
}

while :; do
    sql=$(input)
    echo "$sql" | output
    if [ $? == 0 ]; then
        echo "Teacher SQL added"
    else
        echo "$sql" | error
    fi
done
