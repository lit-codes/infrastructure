#!/bin/bash

set -e

if [ ! -d initdb/data ];then
    ./initdb.sh
fi

docker-compose up
