var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var cookieParser = require('cookie-parser');
var expressSession=require('express-session');

mongoose.connect('mongodb://localhost:27017/webBaza');
var port = process.env.PORT || 8080; // na kom portu slusa server

// ENUMERACIJE
// STATUSI
STATUS = [{name: "To Do", value: 0},
 {name: "In Progress",value : 1 },
{name : "Verify",value : 2 },
 {name : "Done", value : 3 }
]

// PRIORITETI
PRIORITY = [
  {name: "Trivial", value : 0},
  {name: "Minor",value : 1},
  {name: "Major",value : 2},
  {name: "Critical",value : 3},
  {name: "Blocker",value : 4 },
]
//-------------------------

app.get('/status',function(req,res) {
  res.json(STATUS);
});

app.get('/priority',function(req,res) {
  res.json(PRIORITY);
});
//middleware za sesiju
app.use(cookieParser());
app.use(expressSession({ secret: 'keyboard_jdshfissd_cat', cookie: { maxAge: 1800000 }, resave: true, saveUninitialized: true }));

//middleware za citanje zahteva
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

//Klijentska aplikacija
app.use('/', express.static(__dirname+'/client'));

/*
app.get("/",function (req,res) {
  res.sendfile(__dirname + '/client/index.html');
}).get("/login.html",function (req,res) {
  res.sendfile(__dirname + '/client/login.html');});
*/
//Servisi
var userService = require('./services/UserService');
app.use('/UserService/',userService);

var authService = require('./services/AuthService');
app.use('/AuthService',authService);

var projectService = require('./services/ProjectService');
app.use('/ProjectService',projectService);

var taskService = require('./services/TaskService');
app.use('/TaskService',taskService);

var commentService = require('./services/CommentService');
app.use('/CommentService',commentService);

//na kraju dodajemo middleware za obradu gresaka
app.use(function(err, req, res, next) {
  var message = err.message;
  var error = err.error || err;
  var status = err.status || 500;

  res.status(status).json({
    message: message,
    error: error
  });
});


//RUN SERVER

app.listen(port);

console.log('Server radi na portu ' + port);