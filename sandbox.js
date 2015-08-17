var _       = require('lodash');
var ffmpeg  = require('fluent-ffmpeg');
var fs      = require('fs');
var path    = require('path');
var Speaker = require('speaker');
var icecast   = require('icecast');

// connect to the remote stream
icecast.get('http://streaming.nuevotiempo.cl:8080', function (res) {

  // log the HTTP response headers
  console.log(res.headers);

  // log any "metadata" events that happen
  res.on('metadata', function (metadata) {
    console.log(icecast.parse(metadata));
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
    .pipe(speakers, {end:true}); //end = true, close output stream after writing

});
