/**
 * Created by cwoebker on 12.10.16.
 */
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    name : {type : String, default: ''},
    description: {type : String, default: ''},
});

// define our nerd model
// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('RoomObject', schema);
