
var mongoose = require('mongoose');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var DriverSchema = new Schema({
    trid: {
        type: ObjectId,
        ref: 'Truck'
    },
    name: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Driver", DriverSchema);
