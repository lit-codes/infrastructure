#!/bin/bash

: ${REDIS_HOST:=shared-redis}
: ${REDIS_PORT:=6379}
: ${REDIS_CONNECTION:=redis://$REDIS_HOST:$REDIS_PORT}

output() {
    redis-cli -u $REDIS_CONNECTION -x --raw lpush teacher_ratings
}

input() {
    redis-cli -u $REDIS_CONNECTION brpop teachers 0 | grep -v '^teachers$'
}

error() {
    redis-cli -u $REDIS_CONNECTION -x --raw lpush failed_teacher_ratings
}

getTeacher() {
    id=$1
    encoded_id=`echo -n Teacher-$id |base64`
    encoded_query=`perl -pe 's/\n/\\\\n/g' query.graphql`
    encoded_query=${encoded_query::-2}
    encoded_query='{"query":"'"$encoded_query"'","variables":{"count":10000000,"id":"'$encoded_id'","courseFilter":null,"cursor":"YXJyYXljb25uZWN0aW9uOjAK"}}'
    curl -s 'https://www.ratemyprofessors.com/graphql' \
        -H 'Connection: keep-alive' \
        -H 'Pragma: no-cache' \
        -H 'Cache-Control: no-cache' \
        -H 'Authorization: Basic dGVzdDp0ZXN0' \
        -H 'User-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36' \
        -H 'Content-Type: application/json' \
        -H 'Accept: */*' \
        -H 'Origin: https://www.ratemyprofessors.com' \
        -H 'Sec-Fetch-Site: same-origin' \
        -H 'Sec-Fetch-Mode: cors' \
        -H 'Sec-Fetch-Dest: empty' \
        -H 'Accept-Language: en-US,en;q=0.9' \
        -H 'Cookie: ajs_user_id=null; ajs_group_id=null; ajs_anonymous_id=%22e330be45-a1d9-4f1c-9e3e-61800a141eb2%22; promotionIndex=0; ccpa-notice-viewed-02=true' \
        --data-binary "$encoded_query" \
        --compressed
}

while :; do
    teacher=$(input)
    output=$(getTeacher $teacher)
    echo "$output" | output
    if [ $? == 0 ]; then
        echo "Teacher added: $teacher"
    else
        echo "Failed to get teacher: $teacher"
        echo "$output" | error
    fi
done
