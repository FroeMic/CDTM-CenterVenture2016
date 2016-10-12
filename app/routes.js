// grab the nerd model we just created
var Location = require('./models/locationObject');
var passport = require('passport');
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

    app.get('/map/voting', function (req, res) {
        var collectionId = '57fdf5b2fe7db12bf8976827';
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
        res.render('index.hbs', {user: req.session.user});
    });

    app.get('/logout', function (req, res) {
        req.session.user = undefined;
        res.redirect('/');
    });

    app.get('/auth/facebook',
        passport.authenticate('facebook'));

    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            failureRedirect: '/login',
            scope: ['public_profile', 'user_friends']
        }),
        function(req, res) {
            req.session.user = req.user;
            // Successful authentication, redirect home.
            res.redirect('/');
        });

    app.get('*', function(req, res) {
        res.status(404).sendfile('./public/views/404.html'); // TODO: make compatible with Angular App Routing
    });
};