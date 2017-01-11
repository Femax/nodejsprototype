var mongoose = require('mongoose');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var CargoSchema = new Schema({
    minWeight: {
        type: Number,
        req: true
    },
    maxWeight: {
        type: Number,
        req: true
    },  temparatureAllowed: {
        type: Number,
        req: true
    },
    type: {
        type: Number,
        req: true
    }
});

module.exports = mongoose.model("Cargo", CargoSchema);