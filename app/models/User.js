/**
 * Created by cwoebker on 12.10.16.
 */

var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    id : {type: String, default: ''},
    name : {type : String, default: ''},
    description: {type : String, default: ''},
    facebook_id: {type : String, default: ''},
    birthday: {type : Date},
    occupation: {type: String, default: ''},
    gender: {type: String, default: ''},

});

// define our nerd model
// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('User', schema);
