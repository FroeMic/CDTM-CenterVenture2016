/**
 * Created by cwoebker on 14.10.16.
 */

var express = require('express');
var router = express.Router();
var auth = require('../auth');

var mongoose = require('mongoose');
var User = require('../models/User');
var Message = require('../models/Message');

/* GET /rooms listing. */
router.use('/', auth.sessionRequired);
router.get('/', function(req, res, next) {
    Message.find().populate('from').populate('to').exec(function (err, messages) {
        if (err) return next(err);
        res.json(messages);
    });
});

/* POST /rooms */
router.use('/', auth.sessionRequired);
router.post('/', function(req, res, next) {
    req.body.from = req.session.dbuser._id;
    Message.create(req.body, function (err, post) {
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

module.exports = router;