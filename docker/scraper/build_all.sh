#!/bin/bash

set -e

platfors=${1:=linux/amd64}
for repo in */
do
(
    test ! -d $repo && continue
    cd $repo
    ./build.sh $platfors
)
done
