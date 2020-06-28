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

### To port-forward the Kubernetes DB

```bash
kubectl port-forward `kubectl get pod -l app=rmp-db -o name` 5432
```

This command listens on your localhost:5432 (make sure the port is not taken
already), and redirects the traffic to the `rmp-db` pod essentially connecting
you to the production environment.

### To port-forward the Redis server

Redis server is required if you want to run the API in production mode. We can
redirect the localhost:6379 to the production Redis server, similar to what we
did for the DB.

```bash
kubectl port-forward `kubectl get pod -l app=rmp-redis -o name` 6379
```

Redis is used for in-memory caching, see https://cube.dev/docs/caching/ for
more info.

### Creating your own database

You can create your own instance of Redis and PostgreSQL.

To create a new database use the `database/schema.sql` file at the root of this
repository.

```
psql < database/schema.sql
```

# File structure

## dashboard-app

This is our front-end app, it will be served in the production mode and
requires the `LOGIN_PASSWORD` (set in the `.env` file) to login.  

In the development mode you can start it by visiting
[http://localhost:4000/#/dashboard](http://localhost:4000/#/dashboard).

## index.js

This is our backend code, currently pretty dumb, and does nothing useful but
handling authentication and serving the front-end static content.

## .env

Local development is possible by putting the environment variables inside a
`.env` file in the root of this repo and running `npm run dev`. 

An example of such file is:

```
LOGIN_PASSWORD=[adminpassword] # Replace with a password to login from web
REDIS_URL=redis://localhost:6379
REDIS_PASSWORD=[rmppassword] # Replace with Redis password
CUBEJS_DB_HOST=localhost
CUBEJS_DB_NAME=rmp
CUBEJS_DB_USER=rmp
CUBEJS_DB_PASS=[dbpassword] # Replace with PostgreSQL password
CUBEJS_WEB_SOCKETS=true
CUBEJS_DB_TYPE=postgres
CUBEJS_API_SECRET=[apisecrethash] # Replace with the API secret created by the CubeJS CLI
```

## CubeJS schemas

Visit [http://localhost:4000/#/schema](http://localhost:4000/#/schema) to
generate schema files used to connect to the database, you can then edit the
schema files under `schema` folder. See [introduction to CubeJS
schema](https://cube.dev/docs/getting-started-cubejs-schema) for more info.

# To build the image

To build and push the image you can run the `build.sh`. Set `DO_NOT_PUSH` if
you wish to prevent the script from pushing to docker registry.
