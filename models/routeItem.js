var mongoose = require('mongoose');
var relationship = require("mongoose-relationship");
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
var RouterItemSchema = new Schema({
    routeId: {
        type: ObjectId,
        ref:'Route',
        childPath:'routeItems'
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
RouterItemSchema.plugin(relationship, { relationshipPathName:'routeId'});
module.exports = mongoose.model("RouteItem", RouterItemSchema);
