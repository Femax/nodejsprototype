var Comment = require('../models/comment')
var Ticket = require('../models/ticket');
var Location = require('../models/routeItem');
var Driver = require('../models/customer');
var Truck = require('../models/truck');
var Bid = require('../models/bid');
var imageModule = require('../module/imageModule');
var mongoose = require('mongoose');
var Transaction = require('mongoose-transaction')(mongoose);

var Database = function Database() {
    // transaction.update('User', id, {
    //     userId: 'someuser2',
    //     emailId: 'test email2'
    // });
    // transaction.remove('User', id2);
    // transaction.run(function(err, docs) {
    //     // your code here
    // });
}

Database.addTicket(data)
{
    var transaction = new Transaction();
    transaction.insert('Route', {
        createDate: data.createDate,
        endTime: data.endTime,
        status: data.status,
        startLocation: startLocation._id,
        endLocation: endLocation._id,
        isRefrigeratorNeeded: data.isRefrigeratorNeeded,
        imageUrl: imageUrl
    });
    transaction.insert('Ticket', {
        createDate: data.createDate,
        endTime: data.endTime,
        status: data.status,
        startLocation: startLocation._id,
        endLocation: endLocation._id,
        isRefrigeratorNeeded: data.isRefrigeratorNeeded,
        imageUrl: imageUrl
    });

}

Database.deleteImageTicketIById(ticketId)
{

}
Database.updateLocationOfTicket(location, ticketId)
{

}
Database.updateTicket(data)
{

}

module.exports = Database;
