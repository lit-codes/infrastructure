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
    psql -v "ON_ERROR_STOP=1" -d "$DB_CONNECTION" >/dev/null
}

input() {
    redis-cli -u $REDIS_CONNECTION brpop teacher_rating_sqls 0 | grep -v '^teacher_rating_sqls$'
}

incr_error_count() {
    redis-cli -u $REDIS_CONNECTION hincrby teacher_failure_count $1 1
}

while :; do
    sql=$(input)
    teacherId=`echo $sql | grep -oP -- '--teacherId:\K\d+'`
    echo Applying SQL for teacher: $teacherId
    echo "$sql" | output
    if [ $? == 0 ]; then
        echo "Teacher $teacherId added"
    else
        echo Failed to apply SQL for $teacherId
        incr_error_count $teacherId
    fi
done
