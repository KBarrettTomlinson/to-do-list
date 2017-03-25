//requires
var express = require('express');
var bodyParser = require('body-parser');
var toDoList = require('./routes/toDoList.js');

//globals
var app = express();
var port = 5000;

//uses
app.use(express.static('server/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use('/todolist',toDoList);

//listening
app.listen(port, function(){
  console.log("We are listening for you on port:",port);
  console.log("There are a lot of us for this project.");
  console.log("Everything is going to be okay");
});//ends listening
