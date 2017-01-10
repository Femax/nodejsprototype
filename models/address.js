/**
 * Created by fedosov on 1/9/17.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
AddressSchema = new Schema({
    routeItem:{
        type: ObjectId
    },
    address: {
        type: String,
        required: true
    },
    lat: {
        type: Number,
        required: true
    },
    lng: {
        type: Number,
        required: true
    }
});
module.exports = mongoose.model("Address", AddressSchema);

