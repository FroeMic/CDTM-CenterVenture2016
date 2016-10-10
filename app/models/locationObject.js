// app/models/nerd.js
// grab the mongoose module
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    name : {type : String, default: ''},
    description: {type : String, default: ''},
    lat: {type : Number},
    long: {type : Number},
    district: {type : Number}
});

// define our nerd model
// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('LocationObject', schema);
