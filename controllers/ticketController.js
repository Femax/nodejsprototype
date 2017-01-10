var express = require('express');
var router = express.Router();
var Ticket = require('../models/ticket');
var RouteItem = require('../models/routeItem');
var Route = require('../models/route');
var imageModule = require('../module/imageGridFs');
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

router.post('/ticket', function (req, res) {
    //params sended from client
    console.log(req.body);
    const data = JSON.parse(JSON.stringify(req.body));
    const ticket = data.ticket;
    console.log(data.ticket);
    //construct location

    Route.saveRoute(startLocationJson,function (err, id) {
        Ticket.saveTicket(ticket,id,User.getUserIdByToken(req.token));
    });
    //save location, ticket

});


router.put('/ticket/:id', function (req, res) {
    //params sended from client
    console.log(req.body);
    const data = JSON.parse(JSON.stringify(req.body));
    const ticket = data.ticket;
    console.log(data.ticket);
    //construct location
    
    Route.saveRoute(startLocationJson,function (err, id) {
        Ticket.saveTicket(ticket,id,User.getUserIdByToken(req.token));
    });
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
