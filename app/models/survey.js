// app/models/nerd.js
// grab the mongoose module
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    questions: [
      {
        title: {type: String},
        question: {type: String},
        questionType: {
          type: String,
          enum : ['TEXT','CHOICE', 'SLIDER', 'LIKERT'],
        }
        answerOptions: [
          {
            value: {type: Number},
            text: {type: String},
            iconUrl: {type: String}
          }
        ]
      }
    ]
});

module.exports = mongoose.model('Survey', schema);
