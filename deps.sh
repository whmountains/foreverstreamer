#!/bin/bash

set -o errexit
set -o pipefail

apt-get update
curl -sL https://deb.nodesource.com/setup | sudo bash -
apt-get install -y alsa-utils libasound2-dev ffmpeg nodejs

npm install forever -g
npm install
