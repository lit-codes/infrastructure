#!/bin/bash

set -e

rm -rf initdb
docker-compose down --volumes
