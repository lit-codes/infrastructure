#!/bin/bash

set -e

archs=$(cat archs | xargs | tr ' ' ',')
./build_all.sh $archs
