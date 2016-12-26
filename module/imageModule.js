var ImageModule = function ImageModule() {
    this.pathToSaveFolder = './public/image/';
    this.imageDefaultName = 'ticket-';
}

/**
 * Upload image
 *
 * @param {Object} files
 * files contains req.files field
 * @api private
 */
ImageModule.prototype.saveImage = function(files, imageId,callback) {
    var sampleFile;
    console.log(files);
    sampleFile = files.ticketPhoto;
    sampleFile.mv(this.pathToSaveFolder + this.imageDefaultName + imageId + '.jpg', function(err) {
        if (err) {
            callback(err);
        } else {
            callback();
        }
    });
};

ImageModule.prototype.getImageUrl = function(imageId) {
    return pathToSaveFolder + imageDefaultName + imageId + '.jpg';
};

ImageModule.prototype.deleteImage = function(imageId) {
    fileName = this.pathToSaveFolder + this.imageDefaultName + imageId + '.jpg'
    fs.exists(fileName, function(exists) {
        if (exists) {
            //Show in green
            console.log(gutil.colors.green('File exists. Deleting now ...'));
            fs.unlink(fileName);
        } else {
            //Show in red
            console.log(gutil.colors.red('File not found, so not deleting.'));
        }
    });
};
module.exports = new ImageModule();
