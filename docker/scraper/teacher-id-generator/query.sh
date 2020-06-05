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
    psql -v "ON_ERROR_STOP=1" -d "$DB_CONNECTION" -c 'select max(id) from teacher' | grep -o '^ \d*$'
}

gen_seq() {
    from=$1
    size=$2
    (( to=$from + $size ))
    seq $from $to
}

generateRange() {
    from=$1
    : ${from:=0}
    ids=''
    ids_size=0
    while [ $ids_size -lt $QUEUE_SIZE ]; do
        for id in `gen_seq $from $QUEUE_SIZE`; do
redis-cli -u $REDIS_CONNECTION hget teacher_failure_count $id
            error_count=`redis-cli -u $REDIS_CONNECTION hget teacher_failure_count $id | grep '\d*'`
            : ${error_count:=0}
            if [ $error_count -gt 3 ];then continue; fi
            ids+=" $id"
	    (( ids_size+=1  ))
        done
	(( from+=$QUEUE_SIZE ))
    done

    echo redis-cli -u $REDIS_CONNECTION lpush teachers $ids
    redis-cli -u $REDIS_CONNECTION lpush teachers $ids
}

queueIsEmpty() {
    len_sqls=`redis-cli -u $REDIS_CONNECTION llen teacher_rating_sqls | grep '\d*'`
    len_ratings=`redis-cli -u $REDIS_CONNECTION llen teacher_ratings | grep '\d*'`
    len=`redis-cli -u $REDIS_CONNECTION llen teachers | grep '\d*'`
    (( total=$len + $len_ratings + $len_sqls ))
    echo current queue size: $total
    test $total -lt $QUEUE_SIZE
    return $?
}

while :; do
    while queueIsEmpty; do
        from=$(max_id)
	echo $from
        generateRange $from
    done
    sleep 10s
done
