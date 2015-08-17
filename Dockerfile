FROM resin/rpi-raspbian:wheezy-2015-08-12

COPY . /app

RUN app/deps.sh

CMD npm start
