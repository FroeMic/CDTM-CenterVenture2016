/**
 * Created by cwoebker on 14.10.16.
 */

var express = require('express');
var router = express.Router();
var auth = require('../auth');

var mongoose = require('mongoose');
var Room = require('../models/Room');
var User = require('../models/User');
var Bookmark = require('../models/Bookmark');

/* GET /rooms listing. */
router.use('/', auth.sessionRequired);
router.get('/', function(req, res, next) {
    Bookmark.find({owner: req.session.dbuser._id}).populate('room').exec(function (err, bookmarks) {
        if (err) return next(err);
        res.json(bookmarks);
    });
});

router.use('/', auth.sessionRequired);
router.post('/', function(req, res, next) {
    req.body.owner = req.session.dbuser._id;
    Bookmark.create(req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

router.use('/:bookmark_id', auth.sessionRequired);
router.delete('/:bookmark_id', function(req, res, next) {
    Room.find({_id: req.params.bookmark_id, owner: req.session.dbuser._id}).remove(function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

module.exports = router;