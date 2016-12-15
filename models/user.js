var mongoose = require('mongoose');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var UserSchema = new Schema({
    login: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    token: {
        type: String
    },
    phone: {
        type: Number,
        required: false
    }
});

UserSchema.methods = {

    /**
     * Update token
     *
     * @param {String} token
     * @api private
     */

    updateToken: function(token) {
        this.token = token;
        return this.save();
    },


    /**
     * Delete current token
     *
     * @api private
     */

    deleteToken: function() {
        this.token = {};
        this.save();
    }

};


module.exports = mongoose.model("User", UserSchema);
