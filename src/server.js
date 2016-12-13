var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var key = require('../secrets.js');

var app = express();

// allow CORS access
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
    res.header("Content-Type", "application/json");
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// POST request to obtain an access token
app.get('/', function (req, res) {

    var url = 'https://api.lyft.com/oauth/token';
    var client_id = key.lyftClientID;
    var client_secret = key.lyftSecret;
    var data = {"grant_type": "client_credentials", "scope": "public"};
    var auth = new Buffer(client_id + ':' + client_secret).toString('base64');

    request.post({
        url: url,
        body: JSON.stringify(data),
        headers: {
            Authorization: 'Basic ' + auth,
            'Content-Type': 'application/json'
        }
    }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            res.send(body);
        }
        else {
            res.status(400).send(body);
        }
    });
});

// POST request to geocode address;
app.post('/geocode', function (req, res) {

    // Call google geocoding API to translate address to lat-lng
    var googleKey = key.googleGeocoding;
    var address = req.body.address;
    var geocodeUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + address + '&key=' + googleKey;

    request.post({
        url: geocodeUrl,
        headers: {
            'Content-Type': 'application/json'
        },
    }, function (error, response) {
        var geocode = JSON.parse(response.body);

        var lat = geocode.results[0].geometry.location.lat;
        var lng = geocode.results[0].geometry.location.lng;

        var coordinates = {
            lat: lat,
            lng: lng
        };

        if (!error && response.statusCode == 200) {
            res.send(coordinates);
        }
        else {
            res.status(400).send(body);
        }
    });
});

// POST request to retrieve ETA
app.post('/getEta', function (req, res) {

    var lyft_token = req.body.token;
    var lat = req.body.lat;
    var lng = req.body.lng;

    var lyft_url = 'https://api.lyft.com/v1/eta?lat=' + lat + '&lng=' + lng;

    // Call lyft to retrieve ETA
    request.get({
        url: lyft_url,
        headers: {
            Authorization: 'Bearer ' + lyft_token,
            'Content-Type': 'application/json'
        }
    }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            res.send(body);
        }
        else {
            res.status(400).send(body);
        }
    });
});

// POST request to retrieve Cost info
app.post('/getCost', function (req, res) {

    var lyft_token = req.body.token;
    var start_lat = req.body.start_lat;
    var start_lng = req.body.start_lng;
    var end_lat = req.body.end_lat;
    var end_lng = req.body.end_lng;

    var lyft_url = 'https://api.lyft.com/v1/cost?start_lat=' + start_lat + '&start_lng=' + start_lng + '&end_lat=' + end_lat + '&end_lng=' + end_lng;

    // Call lyft to retrieve Cost info
    request.get({
        url: lyft_url,
        headers: {
            Authorization: 'Bearer ' + lyft_token,
            'Content-Type': 'application/json'
        }
    }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            res.send(body);
        }
        else {
            res.status(400).send(body);
        }
    });

});

app.listen(process.env.PORT || 4500);
