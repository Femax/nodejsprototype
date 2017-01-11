var express = require('express');
var router = express.Router();
var Ticket = require('../models/ticket');
var RouteItem = require('../models/routeItem');
var Route = require('../models/route');
var imageModule = require('../module/imageGridFs');
var mongoose = require('mongoose');
var RouteItem = require('../models/routeItem');
var Address = require('../models/address');
var Cargo = require('../models/cargo')
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

router.post('/ticket', function (req, res) {
    //params sended from client
    console.log(req.body);
    const data = JSON.parse(JSON.stringify(req.body));
    const ticket = data.ticket;
    console.log(data.ticket);
    const route = ticket.route;
    //construct location

    let currentAddress = new Address({
        address: route.currentAddress.address,
        lat: route.currentAddress.lat,
        lng: route.currentAddress.lng
    });
    let startAddress = new Address({
        address: route.startAddress.address,
        lat: route.startAddress.lat,
        lng: route.startAddress.lng
    });
    currentAddress.save(function (err, currentAddress) {
        console.log('currentAddress:'+currentAddress);
        if (err) console.log(err);
        else startAddress.save(function (err, startAddress) {
            console.log('startAddress:'+startAddress);
            let routeInstance = new Route({
                currentAddress: currentAddress._id,
                startAddress: startAddress._id,
                routeStatus: route.routeStatus
            });
            routeInstance.save(function (err, routeInstance) {
                if (err) console.log(err);

                route.items.forEach(function (item) {
                    console.log('item: ' + JSON.stringify(item));
                    let address = new Address({
                        address: item.address.address,
                        lat: item.address.lat,
                        lng: item.address.lng
                    });
                    address.save(function (err, address) {
                        if (err) console.log(err);
                        console.log(address);
                        let cargo = new Cargo({
                            minWeignt: item.cargo.minWeignt,
                            maxWeight: item.cargo.maxWeight,
                            temperatureAllowed: item.cargo.temperatureAllowed,
                            customerNmae: item.cargo.customerName,
                            type: item.cargo.type
                        });
                        cargo.save(function (err, cargo) {
                            if (err) console.log(err);
                            console.log(routeInstance);
                            let routeItem = new RouteItem({
                                address: address._id,
                                cargo: cargo._id,
                                order: item.order,
                                routeId: routeInstance._id
                            });

                            routeItem.save();
                        });
                    });
                });
                let ticketInstace  = new Ticket({
                    route:routeInstance._id,
                    createDate: new Date(),
                    status:ticket.status
                });
                ticketInstace.save(function (err, ticketInstace) {
                    res.send(ticketInstace);
                })
            });
        })
    });
});


router.put('/ticket/:id', function (req, res) {
    //params sended from client
    console.log(req.body);
    const data = JSON.parse(JSON.stringify(req.body));
    const ticketJson = data.ticket;
    console.log(data.ticket);
    const route = ticket.route;
    //construct location
    Ticket.findOne({_id: ticketJson.id}, function (err, ticket) {

        Route.saveRoute(route, function (err, id) {

            ticket.update(ticketJson, id);
        });

    })

    //save location, ticket
});

router.post('/ticket/:id/photo', function (req, res) {
    const files = req.files;
    const id = req.params.id;
    console.log(req.files);
    console.log(id);
    const imagename = 'ticket-' + id;
    console.log("err=0");
    imageModule.saveFile(req, imagename, function (err) {
        if (err) res.status(500).send(err.message);
        else {
            console.log("err=0");
            const query = {
                id: id
            };
            console.log("err=0");

            const update = {
                imageName: imagename
            };
            console.log("err=0");
            Ticket.update(update, function (err, numberAffected, rawResponse) {
                console.log("err:" + err);
                console.log("numberAffected:" + numberAffected);
                console.log("rawResponse:" + rawResponse);
                if (err) {
                    console.log("err:" + err);
                    res.status(500).send("err:" + err);
                } else res.status(200).send('Save succesfully');
            });
            console.log("err=0");

        }
    });
});
router.delete('/ticket/:id', function (req, res) {
    //params sended from client
    const ticketId = req.params.id;
    console.log(req.body);

    Ticket.deleteTicketIById(ticketId);
});
module.exports = router;
