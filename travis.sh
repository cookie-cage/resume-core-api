#!/bin/bash

TAG=$1
DOCKER_IMAGE=$2
DOCKER_HUB_USERNAME=$3
DOCKER_HUB_PASSWORD=$4

# input validation
if [[ -z $TAG || -z $DOCKER_IMAGE || -z $DOCKER_HUB_USERNAME || -z $DOCKER_HUB_PASSWORD ]]; then
    echo "usage: ./travis.sh TAG DOCKER_IMAGE DOCKER_HUB_USERNAME DOCKER_HUB_USERNAME";
    echo "e.g.:  ./travis.sh v1.13.6 rezme/resume-core-api marioluan foo@bar";
    exit 0;
fi

# fetch tag from git
TAG_ALREADY_BUILT=`curl -f -s https://hub.docker.com/v2/repositories/$DOCKER_IMAGE/tags/$TAG/`

# only builds new tags
if [ "$TAG_ALREADY_BUILT" != "22" ]; then
    echo tag $TAG has already been built;
    exit 0;
fi

# build
docker build -t $DOCKER_IMAGE .;

# log into docker hub
docker login --username $DOCKER_HUB_USERNAME --password $DOCKER_HUB_PASSWORD;

# tag
docker tag $DOCKER_IMAGE:latest $DOCKER_IMAGE:$TAG;

# push
docker push $DOCKER_IMAGE:latest;
docker push $DOCKER_IMAGE:$TAG;
