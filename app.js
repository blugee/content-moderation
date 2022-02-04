var AWS = require('aws-sdk');
const fs = require('fs-extra');
const chalk = require('chalk');
const unscan = require('unscan');
const ffmpeg = require('ffmpeg');
const log = log;

/**
 *  Checks file on given path and verify content
 * @param {*} path 
 * @returns 
 */
async function fileLocationExample(path) {
    log(path);
    const results = await unscan.nsfw.file(path)
    return results
}

/**
 * Converts video to image on given path at given fps
 * @param {*} path 
 * @param {*} outputTo 
 * @param {*} fps 
 */
const fmpeg = async (path, outputTo, fps) => {
    try {

        new ffmpeg(path, async function (err, video) {
            if (!err) {
                let data = await video.fnExtractFrameToJPG(outputTo, {
                    every_n_frames: fps,
                    file_name: 'image_%t_%s'
                })
                log(data)
                for (let i = 0; i < data.length; i++) {
                    log(__dirname + '/images/' + data[i])
                    let data1 = await fileLocationExample(__dirname + "/" + data[i])
                    if (data1.nsfw && data1.argumentation.porn > 50) {
                        log(chalk.bold.red("nsfw >> ", data1.nsfw, "porn score >> ", data1.argumentation.porn, data[i]));
                        break
                    }
                    log(chalk.bold.green(i, ' >> ', data1.nsfw, data[i]));
                }
                return data
            } else {
                log('Error: ' + err);
            }
        });

    } catch (e) {
        log(e.code);
        log(e.msg);
    }
}

var s3 = new AWS.S3({
    region: process.env.AWS_S3_REGION,
    accessKeyId: process.env.AWS_S3_ACCESS_KEY,
    secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
});;

/**
 *  s3download Download video files from given key and params 
 * @param {*} keyName 
 * @returns 
 */

const s3download = async (keyName) => {

    let params = {
        Bucket: 'contentmoderationtest',
        Key: 'Videos/' + keyName
    };

    let data = fs.createFileSync(__dirname + `/video/${keyName}`);
    log(data)
    let file = fs.createWriteStream(__dirname + `/video/${keyName}`);

    return new Promise((resolve, reject) => {
        s3.getObject(params).createReadStream()
            .on('end', () => {
                return resolve(true);
            })
            .on('error', (error) => {
                return reject(error);
            }).pipe(file);
    });
};

let array = [
    "list",
    "of",
    "videos",
    "on aws s3"
]

/**
 * data loop through array of videos keys and pass it to s3Download and then fmpeg
 */
const data = async () => {
    for (let i = 0; i < array.length; i++) {
        let element = array[i]
        let data = await s3download(element)
        if (data) {
            data = await fmpeg(`video/${element}`, `images/${element.split('.')}`, '60');
            log(data)
        }
        log(data)
    }
}

data()

