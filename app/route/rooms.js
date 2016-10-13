/**
 * Created by cwoebker on 12.10.16.
 */

var express = require('express');
var router = express.Router();
var auth = require('../auth');

var mongoose = require('mongoose');
var Room = require('../models/roomObject');

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

/* PUT /rooms/:id */
router.use('/:id', auth.sessionRequired);
router.put('/:id', function(req, res, next) {
    Room.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* DELETE /rooms/:id */
router.use('/:id', auth.loginRequired);
router.delete('/:id', function(req, res, next) {
    Room.findByIdAndRemove(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

module.exports = router;