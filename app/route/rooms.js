/**
 * Created by cwoebker on 12.10.16.
 */

var express = require('express');
var router = express.Router();
var auth = require('../auth');

var mongoose = require('mongoose');
var Room = require('../models/Room');

/* GET /rooms listing. */
router.use('/', auth.sessionRequired);
router.get('/', function(req, res, next) {
    Room.find(function (err, rooms) {
        if (err) return next(err);
        res.json(rooms);
    });
});

/* POST /rooms */
router.use('/', auth.sessionRequired);
router.post('/', function(req, res, next) {
    req.body.user_id = req.session.user.id;
    console.log(req.body);
    Room.create(req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* GET /rooms/id */
router.use('/:id', auth.sessionRequired);
router.get('/:id', function(req, res, next) {
    Room.findById(req.params.id, function (err, room) {
        if (err) return next(err);
        res.json(room);
    });
});

/* GET /rooms/id */
router.use('/owner/:user_id', auth.sessionRequired);
router.get('/owner/:user_id', function(req, res, next) {
    Room.find({user_id: req.params.user_id}, function (err, rooms) {
        if (err) return next(err);
        res.json(rooms);
    });
});

/* PUT /rooms/:id */
router.use('/:id', auth.sessionRequired);
router.put('/:id', function(req, res, next) {
    Room.where({_id: req.params.id, user_id: req.session.user.id}).update(req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* DELETE /rooms/:id */
router.use('/:id', auth.sessionRequired);
router.delete('/:id', function(req, res, next) {
    Room.find({_id: req.params.id, user_id: req.session.user.id}).remove(function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

module.exports = router;