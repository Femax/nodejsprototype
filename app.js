var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise; //added for work  mongoose promise
mongoose.connect('mongodb://localhost:27017/'); // connect to database
global.config = require('./config');

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use('/',require('./controllers')); //routes which does't require token authentication should be placed here
app.use(require('./middlewares/tokenValidator')); //middleware to authenticate token
//app.use(require('./controllers/')); //Apis to protect and use token should be placed here

app.listen(config.port, function() {
    console.log("Listening at Port " + config.port);
});
