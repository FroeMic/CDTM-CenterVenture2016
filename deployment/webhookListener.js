var express = require('express');
var app = module.exports = express();
var exec = require('child_process').exec;

app.use(express.bodyParser());

app.post('/', function(req, res) {
   console.log("Received Stuff");
   console.log(req.body);

   // only pull if it's the master branch
   if (req.body != undefined && req.body.ref == 'refs/heads/master') {
     console.log("Pulling...");
     exec('./deploy.sh', function (error, stdout, stderr) {
        //console.log('stdout: ' + stdout);
        //console.log('stderr: ' + stderr);
        //if (error !== null) {
        // console.log('exec error: ' + error);
        //}
     });
   }
});

app.listen(9999, function(){
  console.log("The github server listening on port 9999" );
});
