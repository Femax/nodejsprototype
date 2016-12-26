var express = require('express');
var router = express.Router();
var Comment = require('../models/comment')
var Ticket = require('../models/ticket');
var Location = require('../models/location');
var Driver = require('../models/driver');
var Truck = require('../models/truck');
var Bid = require('../models/bid');
var imageModule = require('../module/imageModule');
var mongoose = require('mongoose');

router.get('/ticket', function (req, res) {
    //params sended from client
    const weight = req.body.weight;
    const isRefrigeratorNeeded = req.body.isRefrigeratorNeeded;
    const options = {
        weight: weight,
        hasRefrigerator: isRefrigeratorNeeded
    };
    //find tickets for params
    Ticket.list(options).then(function (tickets) {
        console.log(tickets);
        res.send(tickets);
    });
});


// router.post('/acceptBidForTicket', function(req, res) {
//     //params sended from client
//     const userId = req.body.userId;
//     const ticketId = req.body.ticketId;
//
//     Ticket.findOne({
//         id: ticketId
//     }, function(err, ticket) {
//         ticket.uId = userId;
//         ticket.bid = [];
//         ticket.save(function(err, ticket) {
//             res.status(200).send('ticket accept user');
//         });
//     });
//
// });

router.post('/ticket', function (req, res) {
    //params sended from client
    const status = req.body.status;
    const updateTime = new Date().getMilliseconds();
    const createTime = new Date().getMilliseconds();
    const startTimeInterval = req.body.startTimeInterval;
    const endTimeInterval = req.body.endTimeInterval;
    const weight = req.body.weight;
    const isRefrigeratorNeeded = req.body.isRefrigeratorNeeded;
    const aceeptBid = req.body.acceptBid;

    console.log(req.body);
    //construct location
    const startLocationJson = JSON.parse(req.body.startLocation);
    const endLocationJson = JSON.parse(req.body.endLocation);
    let startLocation = new Location({
        lat: startLocationJson.lat,
        lng: startLocationJson.lng,
        adress: startLocationJson.adress,
        updateTime: new Date().getMilliseconds()
    });
    let endLocation = new Location({
        lat: endLocationJson.lat,
        lng: endLocationJson.lng,
        adress: endLocationJson.adress,
        updateTime: new Date().getMilliseconds()
    });
    //save location, ticket
    startLocation.save(function (err, startLocation) {
        if (err) console.log("err"+err);
        else endLocation.save(function (err, endLocation) {
            if (err) console.log("err:"+err);
            else {
                console.log("Location start:"+startLocation._id);
                console.log("Location end:"+endLocation._id);
                var ticket = new Ticket({
                    createTime: createTime,
                    startTimeInterval: startTimeInterval,
                    endTimeInterval: endTimeInterval,
                    weight: weight,
                    isRefrigeratorNeeded: isRefrigeratorNeeded,
                    startLocationId: startLocation._id,
                    endLocationId: endLocation._id,
                    status: status
                });

                ticket.save();
                res.status(200).json({
                    error: false,
                    ticket: ticket
                });
            }
        });
    });
});

router.post('/ticket/:id/photo', function (req, res) {
    const files = req.files;
    const id = req.params.id;
    const imageId = mongoose.Types.ObjectId();
    console.log(req.files);
    console.log(id);
    imageModule.saveImage(files, imageId, function (err) {
        console.log(err.message);
    });
    const query = {
        id: id
    };
    const update = {
        imageId: imageId
    };
    Ticket.findOneAndUpdate(query, update, {}, function (err) {
        if (err) {
            res.status(500).send(err.message);
        } else res.status(200).send('Save succesfully');
    });
});

router.put('/ticket/:id', function (req, res) {
    //params sended from client
    const ticketId = req.params.id;
    const lat = req.body.lat;
    const lng = req.body.lng;
    const updateTime = new Date().getMilliseconds();
    const status = req.body.status;
    const startLocation = req.body.startLocation;
    const endLocation = req.body.endLocation;
    const startTimeInterval = req.body.startTimeInterval;
    const endTimeInterval = req.body.endTimeInterval;
    const weight = req.body.weight;
    const isRefrigeratorNeeded = req.body.isRefrigeratorNeeded;

    console.log(req.body);
    //construct location
    var update = {
        lat: lat,
        lng: lng,
        status: status,
        startLocation: startLocation,
        endLocation: endLocation,
        startTimeInterval: startTimeInterval,
        endTimeInterval: endTimeInterval,
        weight: weight,
        isRefrigeratorNeeded: isRefrigeratorNeeded
    };
    Ticket.findOneAndUpdate({
        id: ticketId
    }, update, {}, function (err) {
        if (err) {
            res.status(500).send(err.message);
        } else res.status(200).send('Save succesfully');
    });
});

router.delete('/ticket/:id', function (req, res) {
    //params sended from client
    const ticketId = req.params.id;
    console.log(req.body);
    Ticket.deleteTicketById(ticketId);
});
module.exports = router;
