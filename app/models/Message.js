/**
 * Created by cwoebker on 12.10.16.
 */

var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    id : {type: String, default: ''},
    sender_id: {type: String, default: ''},
    receiver_id: {type: String, default: ''},
    subject: {type: String, default: ''},
    content: {flat: String, default: ''}
});

// define our nerd model
// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('Message', schema);
