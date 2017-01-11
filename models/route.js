/**
 * Created by fedosov on 1/9/17.
 */
var mongoose = require('mongoose');
var RouteItem = require('./routeItem');
var Address = require('./address');
var Cargo = require('./cargo');

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var RouteSchema = new Schema({
    ticketId: {
        type: ObjectId
    },
    currentAddress: {
        type: ObjectId,
        required: true,
        ref: 'Address'
    },
    startAddress: {
        type: ObjectId,
        ref: 'Address',
        required: true
    },
    routeStatus: {
        type: Number,
        required: true
    },
    routeItems: [{
        type: ObjectId,
        ref: 'RouteItem'
    }]
});


RouteSchema.statics = {
    saveRoute: function (route, callback) {
    }
};
module.exports = mongoose.model("Route", RouteSchema);