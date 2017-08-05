'use strict';
const Sonus = require('sonus');
const speech = require('@google-cloud/speech')({ // Note: don't forget to enable billing!
    projectId: 'your-project-id',
    keyFilename: 'your-google-api.json'
});
const hotwords = [{
    file: './node_modules/snowboy/resources/alexa.umdl',
    hotword: 'alexa',
    sensitivity: 0.5
}];
const language = "en-US";
const sonus = Sonus.init({
    hotwords,
    recordProgram: 'arecord',
    device: 'mic_channel8',
    language
}, speech);

Sonus.start(sonus);
sonus.on('hotword', (index, keyword) => {
    console.log("!" + keyword);
});
// stt detecting
sonus.on('partial-result', result => {
    console.log("Partial", result);
});
sonus.on('error', (error) => {
    console.log(error);
});
// stt result
sonus.on('final-result', result => {
    console.log("Final", result);
    if (result.includes("stop")) {
        Sonus.stop()
    }
});