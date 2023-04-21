const aws = require('aws-sdk');

const s3 = new aws.S3();

// Configs
const bucket = process.env.BUCKET || "xx-notifier-data-prod";

async function log(options) {
    const currentTime = new Date();
    const {
        request,
        request: { id, type },
        response,
        error
    } = options;

    const logData = {
        timestamp: Math.floor(Date.now() / 1000),
        req: request
    };

    let logPath = '';

    if (error === undefined) {
        logData.res = {
            status: 'success',
            response: response
        }

        logPath = `status/${type}/success/${currentTime.getFullYear()}-${currentTime.getMonth()}-${currentTime.getDate()}/${id}.log`;
    } else {
        logData.res = {
            status: 'error',
            response: error.toString()
        }

        logPath = `status/${type}/error/${currentTime.getFullYear()}-${currentTime.getMonth() }-${currentTime.getDate()}/${id}.log`;
    }

    return s3.putObject({
        Bucket: bucket,
        Key: logPath,
        Body: JSON.stringify(logData)
    }).promise();
}

module.exports = { log };