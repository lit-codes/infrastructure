#!/bin/bash

tmp=$(mktemp -d)

echo 'Downloading the development database files...'
curl -so $tmp/dev-db.tgz https://rmp-data-dev.s3-ap-southeast-1.amazonaws.com/dev-db.tgz

mkdir initdb/
cp ../../database/schema.sql initdb/0_schema.sql
cp init.sql initdb/1_init.sql
pushd initdb/
tar xf $tmp/dev-db.tgz
popd

rm -rf $tmp

docker-compose up -d database
output=$(docker-compose exec -T database psql -qtAX -Urmp rmp -c 'select count(*) from teacher_ratings' 2>/dev/null)
while [ $? != 0 -o "$output" = 0 ]; do
    echo 'Waiting until teacher ratings are available...'
    sleep 1;
    output=$(docker-compose exec -T database psql -qtAX -Urmp rmp -c 'select count(*) from teacher_ratings' 2>/dev/null)
done
