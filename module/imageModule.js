var ImageModule = function ImageModule() {
    this.pathToSaveFolder = './public/image';
    this.imageDefaultName = 'ticket-';
}
ImageModule.prototype.saveImage = function(files,imageId) {
    var sampleFile;
    sampleFile = files.sampleFile;
    sampleFile.mv(this.pathToSaveFolder+this.imageDefaultName+imageId+'.jpg', function(err) {
        if (err) {
            callback(err);
        } else {
            callback();
        }
    });
};
ImageModule.prototype.getImageUrl = function(imageId) {
return pathToSaveFolder + imageDefaultName+imageId+'.jpg';
};

module.exports = ImageModule;
