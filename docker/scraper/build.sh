#!/bin/bash

set -e

tag=${1:=latest}
for repo in */
do
(
    test ! -d $repo && continue
    cd $repo
    ./build.sh $tag
)
done
