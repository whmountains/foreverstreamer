var lame      = require('lame');
var icecast   = require('icecast');
var Speaker   = require('speaker');
var debug     = require('debug');
var streamlog = require('through-logged');
var through   = require('through');
var _         = require('lodash');
var Watchout  = require('watchout');
var os        = require('os');

// URL to a known Icecast stream
var url = process.env.STREAM_URL;

if (!url) {
  if (os.platform() === 'darwin') {
    url = 'http://201.238.215.3:8000';
  }
  else {
    console.log('no stream url!');
    process.exit();
  }
}

console.log('process.env.STREAM_URL = ' + url);

//set up the logging
var header = debug('header');
var meta   = debug('metadata');

var dog = new Watchout(5000, function(haltedTimeout){
  console.log('dog is barking!');
  process.exit();
});

//create a transform function to watch the pcm data
var streamspy = through(function write(data) {
  this.emit('data', data);
  dog.reset();
  //console.log(data[0]);
});

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
     .pipe(streamspy)
     .pipe(new Speaker());
});
