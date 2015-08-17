var _      = require('lodash');
var ffmpeg = require('fluent-ffmpeg');
var fs     = require('fs');

// create the target stream (can be any WritableStream)
var stream = fs.createWriteStream('./outstream.flv');

// make sure you set the correct path to your video file
var proc = ffmpeg('./t1.mp3')
  // use the 'flashvideo' preset (located in /lib/presets/flashvideo.js)
  .preset('flashvideo')
  // setup event handlers
  .on('end', function() {
    console.log('file has been converted succesfully');
  })
  .on('error', function(err) {
    console.log('an error happened: ' + err.message);
  })
  // save to stream
  .pipe(stream, {end:true}); //end = true, close output stream after writing
