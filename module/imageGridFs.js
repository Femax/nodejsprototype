var mongo = require('mongodb');
var Grid = require('gridfs-stream');
// create or use an existing mongodb-native db instance
console.log(config.mongoUrl);


var imageGridFs = function () {

};
imageGridFs.saveFile = function (stream, filename, callback) {
    db.once('open',function (err) {
        console.log('err:'+err);
        if (err) return handleError(err);
        var gfs = Grid(db, mongo);

        // all set!

        var writeStream = gfs.createWriteStream({
            filename: filename
        });
        stream.pipe(writeStream);
        writeStream.on('error', function (err) {
            console.log('err:'+err);
            callback(err);
        });
        writeStream.on('close', function () {
            console.log('Succesfully');
            callback();
        });
    });

};
imageGridFs.deleteFile = function (fileName) {
    conn.once('open', function () {
        gfs.remove({filename: filename}, function (err) {
            if (err) return handleError(err);
            console.log('success');
        });
    });

};
imageGridFs.updateFile = function (stream) {

};

imageGridFs.checkExsist = function (filename, callback) {
    gfs.exist({filename: filename}, function (err, found) {
        callback(err, found);
    });
}
module.exports = imageGridFs;