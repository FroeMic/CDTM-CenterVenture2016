// A generic survey model
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    title: {type: String},
    sections: [
        {
          
        }
      ]
});

module.exports = mongoose.model('Survey', schema);
