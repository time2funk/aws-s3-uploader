const AWS = require('aws-sdk');
const md5 = require('md5');
const debug = require('debug')('class:S3');

const _s3 = Symbol.for('s3');
const _bucket = Symbol.for('bucket');


const S3 = module.exports = class {
    constructor (config) {
        this[_s3] = new AWS.S3(config.auth);
        this[_bucket] = config.auth.Bucket;
        debug(`constructor: object created`);
    }

    upload (buffer, file_name) { // only csv
        return new Promise((resolve, reject) => {
            if (!buffer) reject(`S3:upload: buffer must be specified`);
            else if (!(buffer instanceof Buffer)) 
                reject(`S3:upload: buffer must be an instance of Buffer`);
            
            if (!file_name) file_name = md5(`point-${new Date()}`) + '.csv';    
            const config = {
                Bucket: this[_bucket],
                Key: file_name,
                Body: buffer,
                ACL: 'public-read'
            };
            debug('upload:config', config);
            this[_s3].upload(config, function (err, responce) {
                if (err) {
                    console.log(arguments);
                    // console.log(err);
                    reject(err);
                } else {
                    debug(`upload: File was Successfully uploaded: ${file_name}`);
                    debug("S3:upload:responce", responce);
                    resolve({err, responce});
                    // resolve(responce.Location);
                }
            });
        });
    }

    delete (file_name) {
        return new Promise((resolve, reject) => {
            if (!file_name) reject(`S3:delete: file_name must be specified`);
            else if (typeof file_name !== 'string') 
                reject(`S3:delete: file_name must be a String`);
            
            const config = {
                Bucket: this[_bucket], 
                Key: file_name
            };
            debug('delete:config', config);
            this[_s3].deleteObject(config, function (err, responce) {
                console.log("arguments",arguments);
                if (err) reject(err);
                else {
                    debug(`delete: File was Successfully deleted: ${file_name}`);
                    console.log("S3:delete:responce", responce);
                    resolve(responce);
                }
            });
        });
    }
}

// // other way of aws-s3 uploading --------------------
//  s3.createBucket(function () {
//    var params = {
//     Bucket: BUCKET_NAME,
//     Key: file.name,
//     Body: file.data,
//    };
//    s3bucket.upload(params, function (err, data) {
//     if (err) {
//      console.log('error in callback');
//      console.log(err);
//     }
//     console.log('success');
//     console.log(data);
//    });
//  });

