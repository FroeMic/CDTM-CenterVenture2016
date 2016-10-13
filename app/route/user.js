var express = require('express');
var router = express.Router();
var auth = require('../auth');

var mongoose = require('mongoose');
var Survey = require('../models/survey');
var User = require('../models/userObject');


// get own user object
// router.use('/', auth.sessionRequired);
router.get('/', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(
          req.session.user
    ));
});

// router.use('/personalitySurvey', auth.sessionRequired);
router.post('/personalitySurvey', function (req, res) {
  // console.log(req.data);
  var survey = req.body;
  var personalityProfile = {};
  if (survey.title == 'PersonalitySurvey') {
    personalityProfile.firstname = survey.sections[0].questions[0].answer;
    personalityProfile.lastname = survey.sections[0].questions[1].answer;
    personalityProfile.birthday = new Date(survey.sections[0].questions[2].answer);
    personalityProfile.gender = survey.sections[0].questions[3].answer;
    personalityProfile.occupation = survey.sections[0].questions[4].answer;

    personalityProfile.values = [];

    // section 2
    personalityProfile.values.push({
      title: 'nightowl',
      value: survey.sections[1].questions[0].answer,
      weight: 2,
      min: 1,
      max: 5
    });

    personalityProfile.values.push({
      title: 'guests',
      value: survey.sections[1].questions[1].answer,
      weight: 2,
      min: 1,
      max: 5
    });

    personalityProfile.values.push({
      title: 'party',
      value: survey.sections[1].questions[2].answer,
      weight: 3,
      min: 1,
      max: 5
    });

    personalityProfile.values.push({
      title: 'music',
      value: survey.sections[1].questions[3].answer,
      weight: 2,
      min: 1,
      max: 5
    });

    personalityProfile.values.push({
      title: 'smoke',
      value: survey.sections[1].questions[4].answer,
      weight: 3,
      min: 1,
      max: 5
    });

    personalityProfile.values.push({
      title: 'vegitarian',
      value: survey.sections[1].questions[5].answer,
      weight: 1,
      min: 1,
      max: 4
    });

    // section 3
    personalityProfile.values.push({
      title: 'relationship',
      value: survey.sections[2].questions[0].answer,
      weight: 3,
      min: 1,
      max: 5
    });

    personalityProfile.values.push({
      title: 'privacy',
      value: survey.sections[2].questions[1].answer,
      weight: 3,
      min: 1,
      max: 5
    });

    personalityProfile.values.push({
      title: 'sharing',
      value: survey.sections[2].questions[2].answer,
      weight: 3,
      min: 1,
      max: 5
    });

    personalityProfile.values.push({
      title: 'kitchen',
      value: survey.sections[2].questions[3].answer,
      weight: 3,
      min: 1,
      max: 5
    });

    // section 4
    personalityProfile.values.push({
      title: 'hardworking',
      value: survey.sections[3].questions[0].answer,
      weight: 1,
      min: 1,
      max: 5
    });

    personalityProfile.values.push({
      title: 'tidy',
      value: survey.sections[3].questions[1].answer,
      weight: 2,
      min: 1,
      max: 5
    });

    personalityProfile.values.push({
      title: 'cold',
      value: survey.sections[3].questions[2].answer,
      weight: 1,
      min: 1,
      max: 5
    });

    personalityProfile.values.push({
      title: 'considerate',
      value: survey.sections[3].questions[3].answer,
      weight: 1,
      min: 1,
      max: 5
    });

    personalityProfile.values.push({
      title: 'helpless',
      value: survey.sections[3].questions[4].answer,
      weight: 2,
      min: 1,
      max: 5
    });

    personalityProfile.values.push({
      title: 'stressed',
      value: survey.sections[3].questions[5].answer,
      weight: 1,
      min: 1,
      max: 5
    });

    personalityProfile.values.push({
      title: 'literature',
      value: survey.sections[3].questions[6].answer,
      weight: 1,
      min: 1,
      max: 5
    });

    personalityProfile.values.push({
      title: 'philosophy',
      value: survey.sections[3].questions[7].answer,
      weight: 1,
      min: 1,
      max: 5
    });

    personalityProfile.values.push({
      title: 'peole',
      value: survey.sections[3].questions[8].answer,
      weight: 1,
      min: 1,
      max: 5
    });

    personalityProfile.values.push({
      title: 'happy',
      value: survey.sections[3].questions[9].answer,
      weight: 2,
      min: 1,
      max: 5
    });


    console.log(personalityProfile);
  }

  res.send("Fin");
});

// router.use('/personalitySurvey', auth.sessionRequired);
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
