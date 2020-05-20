const youtubedl = require('youtube-dl');
const fs = require('fs');
const ffmpeg = require('fluent-ffmpeg');

const config = require('./config.js');

var recording = [];
for(model of config.models){
    recording[model] = false;
}
if(config.models.length > 1)
console.log('Models', config.models.join(', '), 'will be checked every', config.refresh, 'seconds.\n')
else
console.log('Model', config.models.join(' '), 'will be checked every', config.refresh, 'seconds.\n');

async function getInfo(username){
    return new Promise((resolve, reject) => {
        youtubedl.getInfo(`https://chaturbate.com/${username}/`, [], (err, info) => {
            if(err) reject(err);
            resolve(info);
        });
    });
}

async function checkModel(username){
    const json = await getInfo(username).catch((error) => {});
    if(json == undefined) return null
    return json.url;
}

async function checkModels(){
    for(model in recording){
        console.log("Checking", model);
        let url = await checkModel(model);
        if(url == null){
            console.log(model, "isn't live");
            continue;
        }
        if(recording[model]){
            console.log(model, "already recording");
            continue;
        }
        recording[model] = ffmpeg(url).audioCodec('copy').videoCodec('copy').on('end', function(){
            recording[model] = false;
            console.log(model, "ended recording");
        }).save(`recordings/${model + new Date().toUTCString()}.mkv`);
        console.log("Started recording". model);
    }
}

setInterval(checkModels, config.refresh * 1000);