var express = require('express');
var router = express.Router();
var Comment = require('../models/comment')
var Ticket = require('../models/ticket');
var Location = require('../models/location');
var Driver = require('../models/driver');
var Truck = require('../models/truck');
var Bid = require('../models/bid');

router.get('/truck', function(req, res) {
    const userId = req.body.userId || {};
    Truck.find({
        userId: userId
    }, function(err, user) {
        if (err) res.status(400).send(err.message);
        else {
            res.status(200).send(user);
        }
    });
});

router.put('/truck', function(req, res) {
    const gosNubmer = req.body.gosNubmer;
    const assignedUserId = req.body.assignedUserId;
    const lat = req.body.lat;
    const lng = req.body.lng;
    const updateTime = req.body.updateTime;
    const maxWeight = req.body.maxWeight;
    const minWeight = req.body.minWeight;
    const hasRefrigerator = req.body.hasRefrigerator;
    const isActive = req.body.isActive;

    var location = new Location(
        lat: lat,
        lng: lng
    );
    location.save(function(err, location) {
        if (err) res.status(400).send(err.message);
        else {
            var truck = new Truck({
                gosNumber: gosNumber,
                location: location._id,
                assignedUserId: userId,
                updateTime: new Date(),
                maxWeight: maxWeight,
                minWeight: minWeight,
                hasRefrigerator: hasRefrigerator,
                isActive: isActive
            });
            truck.save(function(err, truck) {
                if (err) res.status(400).send(err.message);
                else res.status(200).send(truck);
            });
        }
    });



});

router.post('/truck', function(req, res) {
    const truckId = truckId;
    const gosNubmer = req.body.gosNubmer;
    const assignedUserId = req.body.assignedUserId;
    const lat = req.body.lat;
    const lng = req.body.lng;
    const updateTime = req.body.updateTime;
    const maxWeight = req.body.maxWeight;
    const minWeight = req.body.minWeight;
    const hasRefrigerator = req.body.hasRefrigerator;
    const isActive = req.body.isActive;

    var location = new Location(
        lat: lat,
        lng: lng
    );

    location.save(function(err, location) {
        if (err) res.status(400).send(err.message);
        else {
            var fields = {
                gosNumber: gosNumber,
                location: location._id,
                assignedUserId: userId,
                updateTime: new Date(),
                maxWeight: maxWeight,
                minWeight: minWeight,
                hasRefrigerator: hasRefrigerator,
                isActive: isActive
            };
            truck.find({
                truckId: truckId
            }, function(err, truck) {
                if (err) {
                    location.remove();
                    res.status(400).send(err.message);
                } else {
                    truck.update(fields);
                }
            })
        }
    });



});

module.exports = router;
