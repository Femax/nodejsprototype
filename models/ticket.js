var mongoose = require('mongoose');
var Bid = require('./bid');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var TicketSchema = new Schema({
    userId: {
        type: ObjectId,
        ref: 'User'
    },
    createTime: {
        type: Number,
        required: true
    },
    startTimeInterval: {
        type: Number,
        required: true
    },
    endTimeInterval: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    startLocationId: {
        type: ObjectId,
        ref: 'Location',
        required: true
    },
    endLocationId: {
        type: ObjectId,
        ref: 'Location',
        required: true
    },
    isRefrigeratorNeeded: {
        type: Boolean,
        required: true
    },
    comments: [{
        type: ObjectId,
        ref: 'Comment'
    }],
    imageUrl: {
        type: String
    },
    bid: [{
        type: ObjectId,
        ref: 'Bid'
    }]
});

TicketSchema.methods = {
    /**
     * Update location
     *
     * @param {Object} fields
     * @api private
     */

    updateLocation: function(fieds, callback) {

    }

}

TicketSchema.statics = {

    deleteTicketById: function(id) {
        this.findOne({
            id: id
        }, function(err, ticket) {
            if (err) {
                console.log(err.message);
                return ;
            }
            Bid.remove(ticket.bid)
            ticket.remove(function(err) {
                if (err) console.log("Mongoose error :" + err.message);
                else {

                }
            });
        });
    },
    /**
     * List tickets
     *
     * @param {Object} options
     * @api private
     */


    list: function(options) {
        const weight = options.weight || 0;
        const hasRefrigerator = options.hasRefrigerator || false;
        if (weight == 0 && !hasRefrigerator) {
            return this.find()
                .populate('startLocation')
                .populate('endLocation')
                .populate('comments')
                .populate('bid')
                .exec();
        } else {
            return this.find({
                    weight: weight,
                    isRefrigeratorNeeded: hasRefrigerator
                })
                .populate('startLocation')
                .populate('endLocation')
                .populate('comments')
                .populate('bid')
                .exec();
        }
    }
};
module.exports = mongoose.model("Ticket", TicketSchema);
