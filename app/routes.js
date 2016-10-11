// grab the nerd model we just created
var Location = require('./models/locationObject');

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
            res.sendFile('./public/views/mapview.html');
        });

        app.get('/map/plugins', function (req, res) {
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(
                [
                    {
                        name: 'test',
                        url: 'test'
                    }
                ]
            ));
        });

        app.get('/', function(req, res) {
            res.sendFile('./public/views/index.html'); // load our public/mapview.html file
        });

    };
