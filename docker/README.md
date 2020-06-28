# Docker images

Docker is used to build containerized applications that have everything they need to run in a system.

Our applications run in a multi-architecture environment, that means to run them we will need to create multi-arch Docker images.
Docker is smart enough to pull the correct image for each architecture, therefore we can run our instances on AMD64, ARM32v7, and if needed we can add more architecture support.

Our build process currently relies on `qemu-user-static` which only supports running on x86, therefore the images should be built in an x86 machine, but can be used on ARM and x86.

# Building an image

Every repository that is supposed to run as a Docker image comes with a `build.sh` script which you can run to automatically build that image for all the supported architectures (see `docker/archs`) and push them to the dockerhub.

## Not pushing the image

If you don't want to push the docker image, set `DO_NOT_PUSH` environment variable before running `build.sh`.

```bash
DO_NOT_PUSH=true ./build.sh
```
