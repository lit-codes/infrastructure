#!/bin/bash

: ${BATCH_SIZE:=10}
: ${QUEUE_SIZE:=20}
: ${REDIS_HOST:=shared-redis}
: ${REDIS_PORT:=6379}
: ${REDIS_CONNECTION:=redis://$REDIS_HOST:$REDIS_PORT}
: ${DB_HOST:=shared-db}
: ${DB_PORT:=5432}
: ${DB_USER:=user}
: ${DB_PASS:=pass}
: ${DB_NAME:=rmp}
: ${DB_CONNECTION:=postgres://$DB_HOST:$DB_PORT/$DB_NAME?user=$DB_USER&password=$DB_PASS}

max_id() {
    psql -v "ON_ERROR_STOP=1" -d "$DB_CONNECTION" -c 'select max(id) from school' | grep -o '^ \d*$'
}

generateRange() {
    eval redis-cli -u $REDIS_CONNECTION lpush schools {$1..$2}
}

queueIsNotEmpty() {
    len_sqls=`redis-cli -u $REDIS_CONNECTION llen school_rating_sqls | grep '\d*'`
    len_ratings=`redis-cli -u $REDIS_CONNECTION llen school_ratings | grep '\d*'`
    len=`redis-cli -u $REDIS_CONNECTION llen schools | grep '\d*'`
    (( total=$len + $len_ratings + $len_sqls ))
    test $total -gt $QUEUE_SIZE
    return $?
}

while :; do
    from=$(max_id)
    : ${from:=0}
    (( to=$from + $BATCH_SIZE ))
    generateRange $from $to 
    while queueIsNotEmpty; do sleep 20s; done
done
