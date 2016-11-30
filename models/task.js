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
        required:true
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
        type: Number,
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
module.exports = mongoose.model("Task", TaskSchema);
