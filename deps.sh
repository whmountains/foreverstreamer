#!/bin/bash

set -o errexit
set -o pipefail

apt-get update
apt-get install -y alsa-utils libasound2-dev ffmpeg curl

curl -sL https://deb.nodesource.com/setup | sudo bash -
apt-get -y install nodejs

echo $PATH

echo "installing npm dependencies"

pwd
cd app
pwd
npm install forever -g
npm install
