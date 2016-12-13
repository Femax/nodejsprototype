var express = require('express');
var router = express.Router();
var Comment = require('../models/comment')
var Ticket = require('../models/ticket');
var Location = require('../models/location');
var Driver = require('../models/driver');
var Truck = require('../models/truck');
var Bid = require('../models/bid');

router.get('/ticket', function(req, res) {
    //params sended from client
    const weight = req.body.weight;
    const isRefrigeratorNeeded = req.body.isRefrigeratorNeeded;
    const options = {
        weight: weight,
        hasRefrigerator: isRefrigeratorNeeded
    };
    //find tickets for params
    Ticket.list(options).then(function(tickets) {
        console.log(tickets);
        res.send(tickets);
    });

});


router.post('/acceptBidForTicket', function(req, res) {
    //params sended from client
    const userId = req.body.userId;
    const ticketId = req.body.ticketId;

    Ticket.findOne({
        id: ticketId
    }, function(err, ticket) {
        ticket.uId = userId;
        ticket.bid = [];
        ticket.save(function(err, ticket) {
            res.status(200).send('ticket accept user');
        });
    });

});

router.post('/addBidForTicket', function(req, res) {
    //params sended from client
    const bid = req.body.bid;
    const ticketId = req.body.ticketId;

    Ticket.findOne({
        id: ticketId
    }, function(err, ticket) {
        ticket.bid = ticket.bid.push(bid);
        ticket.save(function(err, ticket) {
            res.status(200).send('Bid sended for ticket');
        });
    })

});

router.put('/ticket', function(req, res) {
    //params sended from client
    const lat = req.body.lat;
    const lng = req.body.lng;
    const updateTime = req.body.updateTime;
    const status = req.body.status;
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
    //save location, ticket
    location.save(function(err, location) {
        //construct ticket
        console.log(location);
        if (err) {
            console.log(err.errors);
            res.status(404).send({
                error: true,
                message: err.message
            });
        } else {
            var ticket = new Ticket({
                createTime: createTime,
                startTimeInterval: startTimeInterval,
                endTimeInterval: endTimeInterval,
                weight: weight,
                isRefrigeratorNeeded: isRefrigeratorNeeded,
                startLocation: location._id,
                endLocation: location._id
            });

            ticket.save(function(err, ticket) {
                if (err) {
                    console.log(err.errors);
                    res.status(404).send({
                        error: true,
                        message: err.message
                    });
                } else {

                    res.status(200).json({
                        error: false,
                        ticket: ticket
                    });

                }
            });
        }
    });
});

router.delete('/ticket', function(req, res) {
    //params sended from client
    const ticketId = req.body.ticketId;

    console.log(req.body);
    Ticket.find({
        ticketId: ticketId
    }, function(err, ticket) {
        if (err) res.status(400).send("delete fail");
        else {
            Bid.find({
                bidId: ticket.bidId
            }).remove(function(err) {
                if (err) res.status(400).send("delete fail");
                else  ticket.remove();
            });
        }
    });
});
module.exports = router;
