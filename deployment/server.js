/**
 * Global Module dependencies.
 */
require('coffee-script');

var express = require('express');
var app = module.exports = express();
app.use(express.bodyParser());

require('./listener')(app);

app.listen(9999, function(){
  console.log("The github server listening on port 9999" );
});
