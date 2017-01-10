var mongoose = require('mongoose');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var TicketSchema = new Schema({
    userId: {
        type: ObjectId,
        ref: 'User'
    },
    createDate: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    customer: {
        type: ObjectId,
        ref: 'Customer',
        required: true
    },
    route: {
        type: ObjectId,
        ref: 'Route'
    },
    imageName: {
        type: String
    }
});

TicketSchema.methods = {
    /**
     * Update location
     *
     * @param {Object} fields
     * @api private
     */

    updateLocation: function (fieds, callback) {

    }

}

TicketSchema.statics = {
    getImageName: function (id) {
        this.findOne({
            id: id
        }, function (err, ticket) {
            return (ticket.imageName);
        });
    },

    saveTicket: function (ticketData, routeId, userId) {
        ticket = new this({
            userId: userId,
            route: routeId,
            status: ticketData.status,
            createDate: new Date()
        });
        ticket.save();
    },
    /**
     * List tickets
     *
     * @param {Object} options
     * @api private
     */


    list: function (options) {
        const weight = options.weight || 0;
        const hasRefrigerator = options.hasRefrigerator || false;
        if (weight == 0 && !hasRefrigerator) {
            return this.find()
                .populate('route')
                .exec();
        } else {
            return this.find({
                weight: weight,
                isRefrigeratorNeeded: hasRefrigerator
            })
                .populate('route')
                .exec();
        }
    }
};
module.exports = mongoose.model("Ticket", TicketSchema);
