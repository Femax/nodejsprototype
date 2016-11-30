var mongoose = require('mongoose');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var TruckSchema = new Schema({
    uuid: {
        type: Number,
        required: true
    },
    gosNubmer: {
        type: String,
        required: true
    },
    location: {
        type: Number,
        ref: 'Location'
    },
    assignedDriverId: {
        type: Number,
        ref: 'Driver'
    },
    maxWeight: {
        type: Number,
        required: true
    },
    minWeight: {
        type: Number,
        required: true
    },
    hasRefrigerator: {
        type: Boolean,
        required: true
    },
    isActive: {
        type: Boolean,
        required: true
    }
});

module.exports = mongoose.model("Truck", TruckSchema);
