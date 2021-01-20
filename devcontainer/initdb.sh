#!/bin/bash

tmp=$(mktemp -d)


pushd $tmp
aws s3 cp s3://rmp-data/dev-db.tgz .
popd

mkdir initdb/
cp ../database/schema.sql initdb/0_schema.sql
cp init.sql initdb/1_init.sql
pushd initdb/
tar xf $tmp/dev-db.tgz
popd

rm -rf $tmp
