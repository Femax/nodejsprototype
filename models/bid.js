var mongoose = require('mongoose');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
var BidSchema = new Schema({
    ticketId: {
        type: ObjectId,
        ref: 'Ticket'
    },
    message: {
        type: String,
        required: true
    },
    cost: {
        type: Number,
        required: true
    },
    userId: {
        type: ObjectId,
        required: 'User'
    }
});

module.exports = mongoose.model("Bid", BidSchema);
