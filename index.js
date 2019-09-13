// Require node modules that you need
var express = require('express');
var layouts = require('express-ejs-layouts');
var parser = require('body-parser');
var request = require('request');
var geocoder = require('simple-geocoder');
var moment = require('moment');
require('dotenv').config()

// Declare your app
var app = express();

// Tell express what view engine you want to use
app.set('view engine', 'ejs');

// Include any middleware here
app.use(layouts);
app.use(express.static('static'));
app.use(parser.urlencoded({ extended: false }));

// Declare routes
app.get('/', function(req, res){
	res.render('home');
});

let icons = {
  "partly-cloudy-day": '☀️',
  "cloudy": '☁️',
  "partly-cloudy-day": '🌥',
  "rain": '🌧'
}


app.post('/', function(req, res){
	console.log(req.body);
	geocoder.geocode(req.body.location, function(success, locations) {
		let lat = locations.y;
		let long = locations.x;
		let requestUrl = process.env.DARK_SKY_BASE_URL + lat + ',' + long;
		console.log("Request URL: " + requestUrl)
		if(success) {
			console.log("Location: ", lat, long);
			request(requestUrl, (err, response, body) => {
				if (err || response.statusCode != 200) {
					console.log(err, response, body)
					res.render('404');
				} else {
					let locationInfo = JSON.parse(body)
                    console.log(locationInfo)
                    res.render('result', {
                        location: req.body.location, 
                        longitude: long.toFixed(2), 
                        latitude: lat.toFixed(2),
                        moment: moment,
                        icons: icons,
                        temp: locationInfo.currently,
                        data: locationInfo.daily.data
                    })
				}
			})
		}
	});
});

// Listen on PORT 3000
app.listen(3000, function(){
  console.log('I\'m listening to the smooth sounds of port 3000 in the morning. ☕');
});
