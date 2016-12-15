var mongoose = require('mongoose');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var TicketSchema = new Schema({
    id: {
        type: ObjectId,
    },
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
    startLocation: {
        type: ObjectId,
        ref: 'Location'
    },
    endLocation: {
        type: ObjectId,
        ref: 'Location'
    },
    weight: {
        type: Number,
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
    imageId: {
        type: ObjectId,
        ref: 'Comment'
    },
    bid: [{
        type: ObjectId,
        ref: 'Bid'
    }]
});

TicketSchema.methods = {


}

TicketSchema.statics = {


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
