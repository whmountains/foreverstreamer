/*jshint node:true */
'use strict';

exports.load = function(ffmpeg) {
  ffmpeg
    .format('s16le')
    .audioBitrate('96k')
    .audioCodec('pcm_s16le')
    .audioFrequency(44100)
    .audioChannels(2);
};
