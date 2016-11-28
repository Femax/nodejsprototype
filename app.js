var express = require('express');
var app = express();
var bodyParser = require('body-parser')

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/test', function(req, res) {
  res.json({
    serverIsWorking:true;
  });
});


app.listen(8080, function() {
    console.log('Example app listening on port 80!');
});
