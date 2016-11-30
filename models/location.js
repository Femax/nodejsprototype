var mongoose = require('mongoose');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
var LocationSchema = new Schema({
    uuid: {
        type: ObjectId,
    },
    lat: {
        type: Number,
        required: true
    },
    lat: {
        type: Number,
        required: true
    },
    updateTime: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model("Location", LocationSchema);
