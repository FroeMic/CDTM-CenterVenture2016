/**
 * Created by cwoebker on 12.10.16.
 */

var express = require('express');
var router = express.Router();
var auth = require('../auth');
var helpers = require('../helpers');
var calculatePersonalityMatching = helpers.calculatePersonalityMatching;

var mongoose = require('mongoose');
var Room = require('../models/Room');
var User = require('../models/User');

/* GET /rooms listing. */
router.use('/', auth.sessionRequired);
router.get('/', function(req, res, next) {
    Room.find().populate('owner').exec(function (err, rooms) {
        if (err) return next(err);
        User.findOne({fb_id: req.session.user.id}, function (err, user) {
            if(err) {
                res.status(500).send(
                    JSON.stringify({
                        status: 500,
                        description: 'Internal Server Error'
                    })
                );
            } else {
                var results = [];
                var i;
                for (i = 0; i < rooms.length; ++i) {
                    var room = rooms[i].toObject();
                    var score = calculatePersonalityMatching(user, room.owner);
                    room.score = score;
                    results.push(room);
                    //console.log(room.owner);
                }
                //console.log(user);
                res.json(results);
            }
        });
    });
});

/* POST /rooms */
router.use('/', auth.sessionRequired);
router.post('/', function(req, res, next) {
    req.body.owner = req.session.dbuser._id;
    Room.create(req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* GET /rooms/id */
router.use('/:room_id', auth.sessionRequired);
router.get('/:room_id', function(req, res, next) {
    Room.findById(req.params.room_id, function (err, room) {
        if (err) return next(err);
        res.json(room);
    });
});

/* GET /rooms/id */
router.use('/owner/:user_id', auth.sessionRequired);
router.get('/owner/:user_id', function(req, res, next) {
    Room.find({owner: req.params.user_id}, function (err, rooms) {
        if (err) return next(err);
        res.json(rooms);
    });
});

/* PUT /rooms/:id */
router.use('/:room_id', auth.sessionRequired);
router.put('/:room_id', function(req, res, next) {
    Room.where({_id: req.params.room_id, owner: req.session.user.id}).update(req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* DELETE /rooms/:id */
router.use('/:id', auth.sessionRequired);
router.delete('/:id', function(req, res, next) {
    Room.find({_id: req.params.id, owner: req.session.user.id}).remove(function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

module.exports = router;