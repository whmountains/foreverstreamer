FROM resin/rpi-raspbian:wheezy-2015-08-12

RUN ./deps.sh

COPY . /app

CMD npm start
