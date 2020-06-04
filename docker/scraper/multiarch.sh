#!/bin/bash

set -e

archs=$(cat archs)

docker run --rm --privileged multiarch/qemu-user-static --reset -p yes
for arch in $archs
do
    ./build_all.sh $arch
done
for repo in *
do
    test ! -d $repo && continue
(
    image=litcodes/$repo
    DOCKER_CLI_EXPERIMENTAL=enabled docker manifest create \
        $image:latest \
	$(echo $archs | xargs -d' ' -IXX echo -n --amend $image:XX\ )
    DOCKER_CLI_EXPERIMENTAL=enabled docker manifest push $image:latest
)
done
