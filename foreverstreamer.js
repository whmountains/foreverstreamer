var icecast   = require('icecast');
var Speaker   = require('speaker');
var debug     = require('debug');
var streamlog = require('through-logged');
var through   = require('through');
var _         = require('lodash');
var Watchout  = require('watchout');
var ffmpeg  = require('fluent-ffmpeg');
var fs      = require('fs');
var path    = require('path');

// URL to a known Icecast stream
var streamURL = process.env.STREAM_URL;

if (!streamURL) {
  console.log('no stream url!  Falling back to default');
  streamURL = 'http://streaming.nuevotiempo.cl:8080';
}

console.log('trying to stream from ' + streamURL);

//set up the logging
var header = debug('header');
var meta   = debug('metadata');

// connect to the remote stream
icecast.get(streamURL, function (res) {

  // log the HTTP response headers
  header(res.headers);

  // log any "metadata" events that happen
  res.on('metadata', function (metadata) {
    meta(icecast.parse(metadata));
  });

  //create a transform function to watch the pcm data to see if we're playing audio
  var streamspy = through(function write(data) {
    this.emit('data', data);
    dog.reset();
  });

  // create the target stream (the system's speakers)
  var speakers = new Speaker();

  // convert the audio to pcm
  var proc = ffmpeg(res, {presets: path.resolve('./ffmpeg-presets')})
    // use the pcm preset
    .preset('s16le-speaker')
    // setup event handlers
    .on('end', function() {
      console.log('file has been converted succesfully');
    })
    .on('error', function(err) {
      console.log('an error happened: ' + err.message);
    })
    // save to stream
    .pipe(streamspy, {end:true}); //end = true, close output stream after writing

  //pipe from streamspy to the speakers
  streamspy.pipe(speakers);

  //start watchdog timer
  var dog = new Watchout(5000, function(haltedTimeout){
    console.log('dog is barking!');
    process.exit();
  });

});
