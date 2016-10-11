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
            res.sendfile('./public/views/index.html'); // load our public/index.html file
        });

        app.get('/login', function(req, res) {
            res.sendfile('./public/views/login.html'); // load our public/index.html file
        });

        app.get('/register', function(req, res) {
            res.sendfile('./public/views/register.html'); // load our public/index.html file
        });

        app.get('/auth/facebook',
            passport.authenticate('facebook'));

        app.get('/auth/facebook/callback',
            passport.authenticate('facebook', { failureRedirect: '/login' }),
            function(req, res) {
                // Successful authentication, redirect home.
                res.redirect('/');
            });

        app.get('*', function(req, res) {
            res.status(404).sendfile('./public/views/404.html'); // load our public/index.html file
        });
    };
