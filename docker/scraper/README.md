# Scraper

These are the images used to do the scraping pipeline, each worker takes things
from one queue and pushes them to another. Errors are pushed to the same queue
with the `failed_` prefix.

At the moment some fields are calculated without considering NULL values, and
that leads to incorrect information. The scraping needs to be done again to fix
that mistake.

# To build the images

As a prerequisit, you must be logged in to Docker hub and have write access.

## Build all

Run `./build_all.sh` to create all the images and upload them to the docker registry.

```
./build_all.sh
```

## Multiarch build

To build the multiarch image, run the `./multiarch.sh` script.

```
./multiarch.sh
```

## Building for a specific repo

```
cd [repo]
./build.sh arch
```
