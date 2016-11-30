var express = require('express');
var router = express.Router();

var Task = require('../models/task');
var Location = require('../models/location');
var Driver = require('../models/driver');
var Truck = require('../models/truck');

router.post('/getTasks', function(req, res) {
    //params sended from client
    const maxWeight = req.body.maxWeight;
    const minWeight = req.body.minWeight;
    const hasRefrigerator = req.body.hasRefrigerator;
    const isActive = req.body.isActive;
    //find task for params
    Task.find({
        maxWeight: maxWeight,
        minWeight: minWeight,
        hasRefrigerator: hasRefrigerator,
        isActive: isActive
    }, function(err, tasks) {
        if (err) res.status(404).json({
            error: true,
            message: err.message
        })
        res.status(200).json(tasks);
    });


});


router.post('/addTask', function(req, res) {
    //params sended from client
    const lat = req.body.lat;
    const lng = req.body.lng;
    const updateTime = req.body.updateTime;

    const createTime = req.body.createTime;
    const startLocation = req.body.startLocation;
    const endLocation = req.body.endLocation;
    const startTimeInterval = req.body.startTimeInterval;
    const endTimeInterval = req.body.endTimeInterval;
    const weight = req.body.weight;
    const isRefrigeratorNeeded = req.body.isRefrigeratorNeeded;
    console.log(req.body);
    //construct location
    var location = new Location({
        lat: lat,
        lng: lng,
        updateTime: updateTime
    });
    //save location, task
    location.save(function(err, location) {
        //construct task
        console.log(location);
        if (err) {
            console.log(err.errors);
            res.status(404).send({
                error: true,
                message: err.message
            });
        } else {
            var task = new Task({
                createTime: createTime,
                startTimeInterval: startTimeInterval,
                endTimeInterval: endTimeInterval,
                weight: weight,
                isRefrigeratorNeeded: isRefrigeratorNeeded,
                startLocation: location._id,
                endLocation: location._id
            });

            task.save(function(err, task) {
                if (err) {
                    console.log(err.errors);
                    res.status(404).send({
                        error: true,
                        message: err.message
                    });
                } else {

                    res.status(200).json({
                        error: false,
                        task: task
                    });

                }
            });
        }
    });
});
module.exports = router;
