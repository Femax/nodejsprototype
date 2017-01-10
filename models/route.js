/**
 * Created by fedosov on 1/9/17.
 */
var mongoose = require('mongoose');
var RouteItem = require('./routeItem');
var Address = require('./address');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
var RouteSchema = new Schema({
    ticketId:{
        type: ObjectId
    },
    currentAddress: {
        type: ObjectId,
        required: true,
        ref: 'Address'
    },
    startAddress: {
        type: ObjectId,
        ref: 'Address',
        required: true
    },
    routeStatus: {
        type: Number,
        required: true
    },
    routeItems: [{
        type: ObjectId,
        ref: 'RouteItem'
    }]
});

RouteSchema.statics = {
    saveRoute: function (route, callback) {
        let currentAddress = new Address(route.currentAddress);
        let startAddress = new Address(route.startAdress);

        let routeInstance = new Route({
            currentAdress: currentAddress._id,
            startAdress: startAddress._id,
            routeStatus: route.status
        });
        routeInstance.save(function (err, routeInstance) {
            route.items.forEach(function (item) {
                let routeItem = new RouteItem(item);
                routeItem.save(function (err, routeItem) {
                    routeInstance.routeItems.push(routeItem._id);
                    callback(routeInstance._id);
                });
            })
        });

    }


};
module.exports = mongoose.model("Route", RouteSchema);