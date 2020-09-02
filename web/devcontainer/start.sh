#!/bin/bash

pushd .
cd ../dashboard-app
npm install
popd
docker-compose up
