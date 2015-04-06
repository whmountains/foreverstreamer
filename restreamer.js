var lame = require('lame');
var icecast = require('icecast');
var Speaker = require('speaker');
var debug = require('debug');

// URL to a known Icecast stream
var url = 'http://201.238.215.3:8000';

//set up the logging
var header = debug('header');
var meta   = debug('metadata');

// connect to the remote stream
icecast.get(url, function (res) {

  // log the HTTP response headers
  header(res.headers);

  // log any "metadata" events that happen
  res.on('metadata', function (metadata) {
    meta(icecast.parse(metadata));
  });

  // Let's play the music (assuming MP3 data).
  // lame decodes and Speaker sends to speakers!
  res.pipe(new lame.Decoder())
     .pipe(new Speaker());
});
