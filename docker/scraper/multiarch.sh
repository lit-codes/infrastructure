#!/bin/bash

set -e

archs=$(cat archs)

docker run --rm --privileged multiarch/qemu-user-static --reset -p yes
for arch in $archs
do
    ./build.sh $arch
done
for repo in *
do
    test ! -d $repo && continue
(
    image=litcodes/$repo
    docker manifest create \
        $image:latest \
	$(echo $archs | xargs -d' ' -IXX echo -n --amend $image:XX\ )
    docker push $image:latest
)
done
