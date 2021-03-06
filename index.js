var express = require('express'),
    jade = require('jade'),
    path = require('path'),
    bodyParser = require('body-parser'),
    route = require('./routes/routes.js');

var app = express();
var weather = require('./weather.js');

app.set('view engine', 'jade'); 
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname + '/public'))); 

urlencodedParser = bodyParser.urlencoded({ extended: false });

app.get("/", route.index);

app.listen(3000);