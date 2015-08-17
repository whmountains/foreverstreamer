#!/bin/bash

set -o errexit
set -o pipefail

apt-get update
apt-get install -y alsa-utils libasound2-dev ffmpeg

npm install forever -g
