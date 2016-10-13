var express = require('express');
var router = express.Router();
var auth = require('../auth');

var mongoose = require('mongoose');
var Survey = require('../models/survey');
var User = require('../models/userObject');


// get own user object
router.use('/', auth.sessionRequired);
router.get('/', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(
          req.session.user
    ));
});

router.use('/personalitySurvey', auth.sessionRequired);
router.post('/personalitySurvey', function (req, res) {
  // console.log(req.data);
  console.log(req.body);
});

router.use('/personalitySurvey', auth.sessionRequired);
router.get('/personalitySurvey', function (req, res) {
  Survey.findOne({title: 'PersonalitySurvey'}, function (err, survey) {
    if(err) {
      res.status(500).send(
        JSON.stringify({
          status: 500,
          description: 'Internal Server Error'
        })
      );
    } else {
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(
        survey
      ));
    }
  });
});

module.exports = router;
