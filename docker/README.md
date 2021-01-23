# Development containers

This directory contains the containers needed to run the Postgres database and
GraphQL.

To run the containers using the scripts you will need some basic Unix commands,
if you are on Mac OS or Linux you already have those, if you are on Windows,
you can use Git Bash to run the scripts.

Make sure `docker` and `docker-compose` are installed and running.

The following is what each script does:

#### starts.sh

`start.sh` runs `initdb.sh` if needed, and then starts the database and Hasura
containers.

If successful this should bind hasura on `localhost:8080`, you can test by
opening `http://localhost:8080` in your browser.

#### teardown.sh

Removes any existing container and all the `initdb` data.

#### initdb.sh

The `initdb.sh` will download the DB dump files from a public S3 bucket,
extracts the contents to the `initdb` directory and starts the `database`
container to warm-up the database.
`initdb.sh` then waits until the database is ready to be used an then exits.