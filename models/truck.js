var mongoose = require('mongoose');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var TruckSchema = new Schema({
    gosNumber: {
        type: String,
        required: true
    },
    locationId: {
        type: ObjectId,
        ref: 'Location'
    },
    assignedUserId: {
        type: ObjectId,
        ref: 'User'
    },
    maxWeight: {
        type: Number,
        required: true
    },
    minWeight: {
        type: Number,
        required: true
    },
    hasRefrigerator: {
        type: Boolean,
        required: true
    },
    isActive: {
        type: Boolean,
        required: true
    }
});

TruckSchema.methods = {
    /**
     * Update location
     *
     * @param {Object} fields
     * @api private
     */
    update: function(fields,callback) {
        if (fields.locationId)  this.locationId = fields.locationId;
        if (fields.assignedUserId) this.assignedUserId = fields.assignedUserId;
        if (fields.maxWeight) this.maxWeight = fields.maxWeight;
        if (fields.minWeight) this.minWeight = fields.minWeight;
        if (fields.hasRefrigerator) this.hasRefrigerator = fields.hasRefrigerator;
        if (fields.isActive) this.isActive = fields.isActive;
        return this.save(callback());
    }

}
module.exports = mongoose.model("Truck", TruckSchema);
