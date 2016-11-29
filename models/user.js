var mongoose = require('mongoose');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var UserSchema = new Schema({
    id: ObjectId,
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
});

UserSchema.method.findUserByName = function findUserByName(login, callback) {
    if (login) {
        return this.model('User').find({
            login: login
        }, callback);
    } else {
        console.log("login is null");
    }
}

UserSchema.method.updateToken = function updateToken(token) {
    if (token) {
        this.token = token;
    } else {
        console.log("token is null");
    }
}

UserSchema.method.addUser = function addUser(login,password,callback) {
    var User = new this();
    user.login = login;
    user.password = password;
    this.save(callback);
}

module.exports = mongoose.model("User", UserSchema);
