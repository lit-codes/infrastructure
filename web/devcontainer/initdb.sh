#!/bin/bash

tmp=$(mktemp -d)

pushd $tmp
git clone git@gitlab.com:lit-codes/big.git
cd big
./merge.sh dev-db.tgz
popd

mkdir initdb/data
pushd initdb/data
tar xf $tmp/big/out/dev-db.tgz
popd

rm -rf $tmp
