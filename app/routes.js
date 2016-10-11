// grab the nerd model we just created
var Location = require('./models/locationObject');
var path = require('path');

    module.exports = function(app) {

        // server routes ===========================================================
        // handle things like api calls
        // authentication routes

        // sample api route
        app.get('/api/locationObject', function(req, res) {
            // use mongoose to get all nerds in the database
            Location.find(function(err, locations) {

                // if there is an error retrieving, send the error.
                                // nothing after res.send(err) will execute
                if (err)
                    res.send(err);

                res.json(locations); // return all nerds in JSON format
            });
        });

        // route to handle creating goes here (app.post)
        // route to handle delete goes here (app.delete)

        // frontend routes =========================================================
        // route to handle all angular requests
        app.get('/map', function (req, res) {
            res.sendFile(path.resolve(__dirname, '../public/views') + '/mapview.html');
        });

        app.get('/map/plugins', function (req, res) {
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(
                [
                    {
                        name: 'Test',
                        url: '/dummy/pois'
                    }
                ]
            ));
        });

        app.get('/dummy/pois', function (req, res) {
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(
                [
                    {
                        latlong: [48.143673, 11.558043],
                        badge: 80
                    },
                    {
                        latlong: [48.139498, 11.566090],
                        match: 0.95
                    },
                    {
                        latlong: [48.201509, 11.608744]
                    }
                ]
            ));
        });

        app.get('/', function(req, res) {
            res.sendFile(path.resolve(__dirname, '../public/views') + '/index.html'); // load our public/mapview.html file
        });

        app.get('/login', function(req, res) {
            res.sendfile(path.resolve(__dirname, '../public/views') + '/login.html'); // load our public/index.html file
        });

        app.get('*', function(req, res) {
            res.status(404).sendfile(path.resolve(__dirname, '../public/views') + '/404.html'); // load our public/index.html file
        });
    };
