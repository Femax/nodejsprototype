var mongoose = require('mongoose');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
var RouterItemSchema = new Schema({
    routeId: {
        type: ObjectId
    },
    address: {
        type: ObjectId,
        ref: 'Address'
    },
    order: {
        type: Number
    },
    cargo:{
        type:ObjectId,
        ref:'Cargo'
    }
});

module.exports = mongoose.model("RouteItem", RouterItemSchema);
