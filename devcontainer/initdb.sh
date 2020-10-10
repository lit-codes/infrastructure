#!/bin/bash

tmp=$(mktemp -d)

pushd $tmp
git clone --single-branch --branch development --depth=1 git@gitlab.com:lit-codes/big.git
cd big
./merge.sh dev-db.tgz
popd

mkdir initdb/
pushd initdb/
tar xf $tmp/big/out/dev-db.tgz
popd

rm -rf $tmp
