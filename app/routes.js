// grab the nerd model we just created
var Location = require('./models/locationObject');
var passport = require('passport');

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
        app.get('/', function(req, res) {
            res.render('index.hbs', { user: req.session.user });
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
