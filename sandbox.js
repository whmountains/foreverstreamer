var _       = require('lodash');
var ffmpeg  = require('fluent-ffmpeg');
var fs      = require('fs');
var path    = require('path');
var Speaker = require('speaker');

// create the target stream (can be any WritableStream)
var stream = new Speaker();

// make sure you set the correct path to your video file
var proc = ffmpeg('./t1.mp3', {presets: path.resolve('./ffmpeg-presets')})
  // use the 'flashvideo' preset (located in /lib/presets/flashvideo.js)
  .preset('s16le-speaker')
  // setup event handlers
  .on('end', function() {
    console.log('file has been converted succesfully');
  })
  .on('error', function(err) {
    console.log('an error happened: ' + err.message);
  })
  // save to stream
  .pipe(stream, {end:true}); //end = true, close output stream after writing
