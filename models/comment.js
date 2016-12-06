
var mongoose = require('mongoose');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var CommentSchema = new Schema({
    userId: {
        type: ObjectId,
        ref: 'User'
    },
    message: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Comment", CommentSchema);
