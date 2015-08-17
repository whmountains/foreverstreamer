FROM resin/rpi-raspbian:wheezy-2015-08-12

COPY . /app

RUN ./deps.sh

CMD npm start
