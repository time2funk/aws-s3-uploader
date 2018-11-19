const config = require('./config');
try {

	// // S3 class test --------------------------------------------
	const fs = require('fs');
	const md5 = require('md5');
	const S3 = require('./helper').s3;
	const s3 = new S3(config.aws);
	const file = 'file.csv';
	const name = md5(`point-${new Date()}-${file}`) + '.csv';

	// write file
	fs.readFile(file, function (err, data) {
	    if (err) { throw err; }
	    // cheack csv ext
	    const buffer = new Buffer(data, 'binary');
	    s3.upload(buffer, name).then(link => console.log(`result: ${JSON.stringify(link)}`));
	});

	// delete file
	s3.delete(name).then(res => console.log(`result: ${JSON.stringify(res)}`));

} catch (e) {
    console.log(`Main: ${e}`);
    console.log(`trace: ${e.stack}`);
    process.exit(2);
}