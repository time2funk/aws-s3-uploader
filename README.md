# druid-lookup-class

[ Node.js, AWS-S3 ]

The project contains class to work with Amazon AWS S3 Storage. 

 . upload file

 . delete file

## Build Setup

``` bash
# install dependencies
yarn

# run app
yarn start
# or 
yarn start-dev # to start with DEBUG

# run tests
yarn test # sorry, but there is no tests. need to be implemented
```

### Configure

Create `config.js` file in the project root dir

``` bash
# example ./config.js
const aws_endpoint = '';
const aws_access_key = '';
const aws_secret_key = '';
const aws_bucket = '';

module.exports = {
    "aws": {
        "auth": {
            "endpoint": aws_endpoint,
            "accessKeyId": aws_access_key,
            "secretAccessKey": aws_secret_key,
            "Bucket": aws_bucket,
            "s3BucketEndpoint": true,
            "s3ForcePathStyle": true,
        },
    }
}
```
>  You need to have Amazon User Account with **AmazonS3FullAccess** Credentials


