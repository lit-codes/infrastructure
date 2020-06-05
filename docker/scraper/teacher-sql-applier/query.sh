#!/bin/bash

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
    psql -v "ON_ERROR_STOP=1" -d "$DB_CONNECTION"
}

input() {
    redis-cli -u $REDIS_CONNECTION brpop teacher_rating_sqls 0 | grep -v '^teacher_rating_sqls$'
}

error() {
    redis-cli -u $REDIS_CONNECTION -x --raw lpush failed_teacher_rating_sqls
}

incr_error_count() {
    redis-cli -u $REDIS_CONNECTION hincrby teacher_failure_count $1 1
}

while :; do
    sql=$(input)
    echo "$sql" | output
    teacherId=`echo $sql | grep 'teacherId: \d*'| grep '\d*'`
    if [ $? == 0 ]; then
        echo "Teacher SQL added"
    else
        echo "$sql" | error
	incr_error_count $teacherId
    fi
done
