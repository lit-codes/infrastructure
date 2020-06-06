#!/bin/bash

: ${BATCH_SIZE:=10}
: ${QUEUE_SIZE:=20}
: ${FAILURE_THRESHOLD:=1}
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
    psql -v "ON_ERROR_STOP=1" -d "$DB_CONNECTION" -c 'select max(id) from teacher' | grep -oP '^\s*\K\d+$'
}

generateRange() {
    from=$1
    : ${from:=0}
    id=$from
    ids=''
    size=0
    while [ $size -lt $QUEUE_SIZE ];do
        error_count=`redis-cli -u $REDIS_CONNECTION hget teacher_failure_count $id | grep -oP '\d+'`
        echo $id $error_count
        : ${error_count:=0}
        if [ $error_count -gt $FAILURE_THRESHOLD ]; then
            (( id+=1 ))
            continue
        fi
        ids+=" $id"
        (( size+=1 ))
        (( id+=1 ))
    done
    echo range added: $ids
    redis-cli -u $REDIS_CONNECTION lpush teachers $ids
}

queueIsEmpty() {
    len_sqls=`redis-cli -u $REDIS_CONNECTION llen teacher_rating_sqls | grep -oP '\d+'`
    len_ratings=`redis-cli -u $REDIS_CONNECTION llen teacher_ratings | grep -oP '\d+'`
    len=`redis-cli -u $REDIS_CONNECTION llen teachers | grep -oP '\d+'`
    (( total=$len + $len_ratings + $len_sqls ))
    test $total -lt $QUEUE_SIZE
    return $?
}

while :; do
    while queueIsEmpty; do
        from=$(max_id)
        (( from+=1 ))
        generateRange $from
        sleep 1
    done
    sleep 10
done
