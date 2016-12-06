var mongoose = require('mongoose');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var TaskSchema = new Schema({
    uuid: {
        type: ObjectId,
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
    }]
});

TaskSchema.methods = {
    /**
     * Update token
     *
     * @param {Object} location
     * @api private
     */
    updateLocation: function(locationid) {
        this.location = locationid;
        return this.save();
    }

}

TaskSchema.statics = {


    /**
     * List tasks
     *
     * @param {Object} options
     * @api private
     */

    list: function(options) {
        const weight = options.weight || {};
        const hasRefrigerator = options.hasRefrigerator || false;
        return this.find({
                weight: weight,
                isRefrigeratorNeeded: hasRefrigerator
            })
            .populate('startLocation')
            .populate('endLocation')
            .populate('comments')
            .exec();
    }
};
module.exports = mongoose.model("Task", TaskSchema);
