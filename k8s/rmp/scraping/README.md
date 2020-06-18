# Scraper

Scrapers work in multi-stage way, the reason is that gives us a loosely coupled
system. We can scale each stage individually depending on the nature of the
task, for example if repeating the scraping from disk the scraper job is very
easy, and can be scaled down.

## Stages:

1. `ID Generator`: This stage generates (teacher or school) IDs, (and potentially
   other parameters) depending on the type of data. There are many ways we can
   generate those IDs, they usually are defined as `GENERATOR` environment
   variable and may require different configuration.
2. `Scraper`: This stage takes the parameters from the ID generator and tries to
   fetch the data, either from a local cache or the remote location. It passes
   the data and parameters to the next stage.
3. `SQL Generator`: This stage generates SQL files based on the data scraper
   produced. The SQL files are meant to be repeatable. They should always
   assume there will be conflicts on the target database and be able to decide
   what to do with the conflict to avoid unnecessary errors. This stage passes
   the generated SQL and parameters to the next.
4. `SQL Applier`: This stage takes the SQL from SQL Generator and simply
   applies them to the production DB. This is the last stage and if a data
   reaches this far, it's safe to remove it from cache.

## Error handling

Each stage sets a key on the Redis server whenever it fails to process
something, that key includes the ID of the failed object and can be used to
repeat the process or debug. This key can be used as a GENERATOR for the ID
Generator to repeat all the failed attempts.

In case of `teacher` the number of failures can be accessed from the hash key
`teacher_failure_count` each key is the teacher ID and the value is the number
of the failures.

## Initial configurations

### ID Generator

The ID Generator works by generating a bulk of IDs using the method specified
by `GENERATOR`, and stores them in a file. If that file exists but is empty it
assumes the ID generation has completed and stops. If that file is not there,
it will try to generate all the IDs at once and stores them in the file.

*Note:* If you see the ID generator immediately completes after creation, that
usually means the IDs file is empty, you can go ahead and remove and create the
persistant volume to start with a clean slate.

- `GENERATOR`: currentTeachers|sequentialIds|updateRatings
- `BATCH_SIZE`: Number of IDs to push to Redis
- `EMPTY_QUEUE_THRESHOLD`: When the number of keys in *all* the queues
  cumulatively are less than this number ID generator adds another batch
- `CACHE_DIR`: Data directory used to keep the batch and the IDs file
- `SLEEP_FULL_QUEUE`: How long go to sleep after pushing a batch before
  checking again if queue is empty
- `MAX_GENERATED_ID`: used for `sequentialIds` to generate ids from 1 to this
  number

### Scraper

- `DATA_DIR`: Where to store the scraped data, this can grow to a few Gigabytes
- `USE_CURSOR`: Used with the `updateRatings` generator to get ratings
  beginning from a cursor

### Redis config

- `REDIS_HOST`: Which redis to use for scraping (better not to use production
  Redis for development and testing)
- `REDIS_PORT`: Default is `6379`
- `REDIS_PASS`: This should not be hardcoded, instead should be saved as a
  secret object

### Postgres DB config

- `DB_HOST`: DB with write access, *Avoid using the production database for
  development*
- `DB_PORT`: Default is `5432`
- `DB_USER`: Default is `rmp`
- `DB_PASS`: Preferably stored in a secret object
- `DB_NAME`: Default is `rmp`. This is the DB object to use, multiple scrapers
  can use the same database server with different database objects

## Requirements

### ID Generator

- Redis connection
- Database connection
- Persistant storage
- Ideally exactly `1` replica, anything more than `1` replica can cause IDs to
  be lost

### Scraper

- Redis connection
- Internet access
- Persistant storage
- This can be scaled out on demand to speed up the process, but beware of
  flooding the remote URL that will increase the failure rate

### SQL Generator

- Redis connection
- This is most of the time very fast and scaling it usually is useless

### SQL Applier

- Redis connection
- Database connection
- This can be scaled out as many times as the number of connections the
  database can accept, but if this is your bottleneck, you are lucky!

# Development

Development can be done using a separate Redis and Postgres database (currently
we only support postgres).

Each stage can be developed and tested individually, normally they read the
data from Redis, but that can also be changed.

It's possible to run a database and Redis manually and set the `REDIS_HOST` and
`DB_HOST` to localhost to connect to them locally.

You can create the database using a `pg_dump` file or an empty DB from the
schema file in the `database` folder on this repository.

To run each stage simply check the `entrypoint` of the `Dockerfile` and run the
command locally in your laptop.

## Debugging

Most of the stages are safe to run multiple times, so for debugging purposes,
you can login to one instance of the stage using `kubectl exec` and install
your favorite text-based editor in there and start changing the code and
running it locally, you don't need to worry about breaking the code in there
much as far as your changes do not reach the database you can simply delete the
stage instance to start over. 

Another way to debug this is to create a `.env` file for docker with the
environments (taken from the Kubernetes manifest) and run the image. You can
then mount the directory on your local machine for further development.

## Testing

Currently we don't have any tests, but we can simply add tests for GitlabCI,
CircleCI using Docker images, testing gives us a much better development speed
and experience.
