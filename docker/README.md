# Docker

Docker is a containerization solution that is compatible with many applications
including Kubernetes. Containers are isolated environments to run a process.
Learn more at https://docs.docker.com/engine/.

Make sure docker is installed and working, if not install from docker.com
https://docs.docker.com/engine/install/ubuntu/.

# How to build the images

There is a `build.sh` in each of the image repositories which can be used to build the image.

For example, to build the RMP image:

```bash
cd rmp
./build.sh lit-codes/rmp amd64
```

In the above example, `lit-codes/rmp` is the name of the image and `amd64` is
the tag. The script automatically tags `latest` as well, so two tags are
created.

Now you can push the image to Dockerhub (ask for the secret if you don't
already have it):

```bash
docker push lit-codes/rmp:amd64 # the image we just built
docker push lit-codes/rmp:latest # the latest tag (do this for the default tags only)
```

You can then test by running your image:

```bash
docker run -e [environments] lit-codes/rmp:amd64 [options]
```

Or you can get a shell and inspect what's inside:

```bash
docker run -it lit-codes/rmp:amd64 -- bash
```

Learn more at https://docs.docker.com/develop/

## rmp

Repository for the
[lit-codes/rmp](https://hub.docker.com/repository/docker/litcodes/rmp) image.
See [rmp README]( rmp/README.md ).
