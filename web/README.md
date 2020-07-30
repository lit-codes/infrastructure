# RMP

A dashboard for analysis of the RMP website. This repository contains the files
used to build the
[lit-codes/rmp](https://hub.docker.com/repository/docker/litcodes/rmp) image.
The image contains the API and the front-end application based on
[Cube.js](https://cube.dev/) and PostgreSQL.

## Run in development mode

To run the development environment:

```bash
npm install
npm run dev
```

## Run in production mode

Or run the server in production mode:

```bash
npm install
npm start
```

This will ask for a password to login, default username/password is set in the
`.env` file to `admin`/`admin`.

## Access the database

To run the API, you will need a working database with the schema matching the
rmp-db. You can either create a new database with that schema, or connect to
the database running in Kubernetes.

### Development on the local machine

For local development run this:

```bash
# Basic config
export REDIS_URL=redis://localhost:6379
export CUBEJS_DB_HOST=localhost
export CUBEJS_DB_NAME=rmp
export CUBEJS_DB_USER=rmp
export CUBEJS_DB_TYPE=postgres
export CUBEJS_WEB_SOCKETS=true
# Secrets
export LOGIN_PASSWORD=`kubectl get secrets rmp-secret -o json|jq -r '.data.loginpassword'|base64 -d`
export REDIS_PASSWORD=`kubectl get secrets rmp-secret -o json|jq -r '.data.redispassword'|base64 -d`
export CUBEJS_DB_PASS=`kubectl get secrets rmp-secret -o json|jq -r '.data.dbpassword'|base64 -d`
export CUBEJS_API_SECRET=`kubectl get secrets rmp-secret -o json|jq -r '.data.apisecret'|base64 -d`
# Port forwarding
kubectl port-forward `kubectl get pod -l app=rmp-db -o name` 5432 &
kubectl port-forward `kubectl get pod -l app=rmp-redis -o name` 6379 &
```

**Note:** If you are running your own PostgreSQL and Redis instance, replace
the related config above with your own credentials and address.

### Creating your own database

You can create your own instance of Redis and PostgreSQL.

To create a new database use the `database/schema.sql` file at the root of this
repository.

```
psql < database/schema.sql
```

### Create your own Redis

A Redis instance is required to run the server in production mode.

# File structure

## dashboard-app

This is our front-end app, it will be served in the production mode and
requires the `LOGIN_PASSWORD` (set in the `.env` file) to login.  

In the development mode you can start it by visiting
[http://localhost:8081/#/dashboard](http://localhost:8081/#/dashboard).

## index.js

This is our backend code, currently pretty dumb, and does nothing useful but
handling authentication and serving the front-end static content.

## CubeJS schemas

Visit [http://localhost:8081/#/schema](http://localhost:8081/#/schema) to
generate schema files used to connect to the database, you can then edit the
schema files under `schema` folder. See [introduction to CubeJS
schema](https://cube.dev/docs/getting-started-cubejs-schema) for more info.

# To build the image

To build and push the image you can run the `build.sh`. Set `DO_NOT_PUSH` if
you wish to prevent the script from pushing to docker registry.
