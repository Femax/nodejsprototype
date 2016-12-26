var mongoose = require('mongoose');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
var bidTag = "Bid";

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
BidSchema.statics = {
    delete: function(ids) {
        ids.forEach(function(id) {
            deleteOne(id);
        });
    },

    deleteOne: function(id) {
        Bid.findOne({
            _id: id
        }, function(err, bid) {
            if (err) console.log("Mongoose error in schema " + bidTag + "." + arguments.callee.toString());
            bid.remove(function(err) {
                if (err) console.log("Mongoose error in schema " + bidTag + "." + arguments.callee.toString());
            });
        });

    }
}
module.exports = mongoose.model("Bid", BidSchema);
