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
    var oauth = {
        client_id: client_id,
        client_secret: client_secret
    };

    request.post({
        url: url,
        oauth: oauth,
        body: JSON.stringify(data),
        headers: {
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
