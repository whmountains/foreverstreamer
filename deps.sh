#!/bin/bash

set -o errexit
set -o pipefail

# make sure we're in the right dir
cd /app

apt-get update

# install base tools
./buildpack.sh

# install main dependencies
apt-get install -y alsa-utils libasound2-dev ffmpeg

# install node.js
curl -sL https://deb.nodesource.com/setup | sudo bash -
apt-get -y install nodejs

# install node dependencies
npm install forever -g
npm install
