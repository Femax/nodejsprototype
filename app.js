var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var morgan = require('morgan');

global.config = require('./config');
mongoose.connect(config.mongodbUrl); // connect to database
mongoose.Promise = global.Promise; //added for work  mongoose promise
// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(morgan('dev'));
app.use('/', require('./controllers/user'));
app.use(require('./middlewares/tokenValidator')); //middleware to authenticate token
app.use('/', require('./controllers/task')); //Apis to protect and use token should be placed here

app.listen(config.port, function() {
    console.log("Listening at Port " + config.port);
});
