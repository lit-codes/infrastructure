#!/bin/bash

set -e

if [ ! -d initdb ];then
    ./initdb.sh
fi

docker-compose up $@
