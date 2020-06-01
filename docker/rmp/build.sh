#!/bin/bash

set -e

IMAGE=litcodes/rmp
TAG=`uname -m`

if [ -n "$1" -a -n "$2" ]; then
    IMAGE="$1"
    TAG="$2"
elif [ -n "$1" ]; then
    TAG="$1"
fi

docker build -t $IMAGE:$TAG .
docker tag $IMAGE:$TAG $IMAGE:latest
