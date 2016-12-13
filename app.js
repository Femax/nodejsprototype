var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var morgan = require('morgan');
var fileUpload = require('express-fileupload');

global.config = require('./config');
mongoose.connect(config.mongodbUrl); // connect to database
mongoose.Promise = global.Promise; //added for work  mongoose promise
// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(fileUpload());
app.use(morgan('dev'));
app.use('/', require('./controllers/authController'));
app.use(require('./middlewares/tokenValidator')); //middleware to authenticate token
app.use('/', require('./controllers/ticketController')); //Apis to protect and use token should be placed here

app.listen(config.port, function() {
    console.log("Listening at Port " + config.port);
});
