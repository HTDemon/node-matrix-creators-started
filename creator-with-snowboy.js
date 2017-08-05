'use strict';
const record = require('node-record-lpcm16');
const { Detector, Models } = require('snowboy');
const models = new Models();

models.add({
    file: './node_modules/snowboy/resources/alexa.umdl',
    sensitivity: '0.7',
    hotwords: 'alexa'
});

const detector = new Detector({
    resource: "./node_modules/snowboy/resources/common.res",
    models: models,
    audioGain: 2.0
});

detector.on('silence', function () {
    console.log('silence');
});

detector.on('sound', function (buffer) {
    // <buffer> contains the last chunk of the audio that triggers the "sound"
    // event. It could be written to a wav stream.
    console.log('sound');
});

detector.on('error', function () {
    console.log('error');
});

detector.on('hotword', function (index, hotword, buffer) {
    // <buffer> contains the last chunk of the audio that triggers the "hotword"
    // event. It could be written to a wav stream. You will have to use it
    // together with the <buffer> in the "sound" event if you want to get audio
    // data after the hotword.
    console.log(buffer);
    console.log('hotword', index, hotword);
});

const mic = record.start({
    sampleRate: 16000, // audio sample rate
    threshold: 0.5, // silence threshold (rec only)
    thresholdStart: null, // silence threshold to start recording, overrides threshold (rec only)
    thresholdEnd: null, // silence threshold to end recording, overrides threshold (rec only)
    silence: '3.0', // seconds of silence before ending
    verbose: false, // log info to the console
    recordProgram: 'arecord', // Defaults to 'rec' - also supports 'arecord' and 'sox'
    device: 'mic_channel8', // recording device (e.g.: 'plughw:1')
});

mic.pipe(detector);