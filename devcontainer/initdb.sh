#!/bin/bash

tmp=$(mktemp -d)

pushd $tmp
aws s3 cp s3://rmp-data/dev-db.tgz .
popd

mkdir initdb/
pushd initdb/
tar xf $tmp/dev-db.tgz
popd

rm -rf $tmp