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

// POST request to retrieve locations of nearby drivers
app.post('/getNearby', function (req, res) {

    var lyft_token = req.body.token;
    var lat = req.body.lat;
    var lng = req.body.lng;

    var lyft_url = 'https://api.lyft.com/v1/drivers?lat=' + lat + '&lng=' + lng;

    // Call lyft to retrieve Nearby Drivers
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
        } else {
            res.status(400).send(body);
        }
    });

});


// TODO verify all front end calls don't contain secret tokens

// GET request to retrieve Route Directions
app.get('/getDirections', function (req, res) {

    var mapbox_url = `https://api.mapbox.com/directions/v5/mapbox/driving/${req.body.start_lat},${req.body.start_lng};${req.body.end_lat},${req.body.end_lng}.json?access_token=${key.mapbox}&geometries=geojson&steps=true`;

    request.get({
        url: mapbox_url,
    }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            res.send(body);
        } else {
            res.status(400).send(body);
        }
    });
});

// POST request to create a Driver and POST request to create a Task, and return a TRACKING URL
app.post('/setPin', function (req, res) {

    var hypertrack_url = 'https://app.hypertrack.io/api/v1/drivers/';
    var destination = req.body.destination;

    // POST request to create a DRIVER
    request.post({
        url: hypertrack_url,
        body: {
            "name": "Person1",
            "vehicle_type": req.body.vehicle_type
        },
        headers: {
            Authorization: 'token ' + key.hypertrack,
            'Content-Type': 'application/json'
        },
        json: true
    }, function (error1, response1, body1) {

        if (!error1 && response1.statusCode == 200) {

            var hypertrack_url2 = 'https://app.hypertrack.io/api/v1/tasks/';

            // POST request to create a TASK
            request.post({
                url: hypertrack_url2,
                body: {
                    driver_id: response1.id,
                    vehicle_type: response1.vehicle_type,
                    destination: destination
                },
                headers: {
                    Authorization: 'token ' + key.hypertrack,
                    'Content-Type': 'application/json'
                },
                json: true
            }, function (error2, response2, body2) {
                if (!error2 && response2.statusCode == 200) {
                    response2.send(body2);
                } else {
                    response2.send(body2);

                    // res.status(400).send(body);
                }
            })
        } else {
            res.send(body1);
            // TODO: why doesn't this work, getting expected response, but 400 error
            // res.status(400).send(body);
        }
    });
});



app.listen(process.env.PORT || 4500);
