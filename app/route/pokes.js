/**
 * Created by cwoebker on 14.10.16.
 */

var express = require('express');
var router = express.Router();
var auth = require('../auth');

var mongoose = require('mongoose');
var User = require('../models/User');
var Poke = require('../models/Poke');

/* GET /rooms listing. */
router.use('/', auth.sessionRequired);
router.get('/', function(req, res, next) {
    Poke.find().populate('from').populate('to').exec(function (err, pokes) {
        if (err) return next(err);
        res.json(pokes);
    });
});

/* POST /rooms */
router.use('/', auth.sessionRequired);
router.post('/', function(req, res, next) {
    req.body.from = req.session.dbuser._id;
    Poke.create(req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* GET /rooms/id */
router.use('/:poke_id', auth.sessionRequired);
router.get('/:poke_id', function(req, res, next) {
    Poke.findById(req.params.room_id, function (err, poke) {
        if (err) return next(err);
        res.json(poke);
    });
});

module.exports = router;