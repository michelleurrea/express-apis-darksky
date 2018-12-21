// Require node modules that you need
var express = require('express');
var geocoder = require('simple-geocoder');
var layouts = require('express-ejs-layouts');
var moment = require('moment');
var parser = require('body-parser');
var request = require('request');

// Include .env variables
require('dotenv').config();

// Declare your app
var app = express();

// Tell express what view engine you want to use
app.set('view engine', 'ejs');

// Include any middleware here
app.use(layouts);
app.use(express.static('static'));
app.use(parser.urlencoded({ extended: false }));
app.use(function(req, res, next) {
  res.locals.moment = moment;
  res.locals.icons = {
    'cloudy': '🌥',
    'rain': '🌧',
    'partly-cloudy-day': '🌤',
    'partly-cloudy-night': '☁',
    'wind': '🌬',
    'sun': '🌞',
    'clear-day': '🌞',
    'clear-night': '🌙',
    'snow': '🌨',
    'fog': '🌫',
    'thunder': '⛈'
  }
  next();
});

// Declare routes
app.get('/', function(req, res){
  res.render('home');
});

app.post('/', function(req, res){
  geocoder.geocode(req.body.location, function(success, locations){
    if(!success){
      return res.render('error');
    }

    // Passed the error check, now let's store the data
    var lng = locations.x;
    var lat = locations.y;
    var url = process.env.DARK_SKY_BASE_URL + lat + ',' + lng;

    request(url, function(error, response, body) {
        // Parse the data
        var result = JSON.parse(body);

        res.render('result', {
          location: req.body.location,
          lat: lat,
          lng: lng,
          result: result
        });
    });
  });
});

// Listen on PORT 3000
app.listen(3000, function(){
  console.log('I\'m listening to the smooth sounds of port 3000 in the morning. ☕');
});
