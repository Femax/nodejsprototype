var mongoose = require('mongoose');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var CustomerSchema = new Schema({
    contactName: {
        type: String,
        req: true
    },
    loadingContactName: {
        type: String,
        req: true
    }, offloadingContactName: {
        type: String,
        req: true
    },
    loadingPhone: {
        type: String,
        req: true
    },
    offloadingPhone: {
        type: String,
        req: true
    }
});

module.exports = mongoose.model("Customer", CustomerSchema);
