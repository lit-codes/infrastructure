#!/bin/bash

set -e

if [ ! -d initdb -o ! -f initdb/teacher.csv ];then
    rm -rf initdb
    ./initdb.sh
fi

docker-compose up $@
