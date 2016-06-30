var express = require('express');
//var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
// koristimo mongoose model koju smo kreirali u folderu model

var User = require(__dirname+'/../model/User'); // get the mongoose model
var Project = require(__dirname+'/../model/Project');
var UserRouter = express.Router(); // koristimo express Router

// definisanje ruta za usera
UserRouter
  .get('/user/:username', function(req, res, next) {
    User.findOne({
      "username": req.params.username
    }).exec(function(err, entry) {
      // ako se desila greska predjemo na sledeci middleware (za rukovanje greskama)
      if (err) next(err);
      res.json(entry);
    });
  })
  .get('/users/', function(req, res) {
    // svi koji nisu admini
    User.find({"role": false}, function(err, data, next) {
       if (err) next(err);
      res.json(data);
    });
  })
  .delete('/user/:username', function(req, res, next) {
    User.remove({
      "_username": req.params.id
    }, function(err, successIndicator) {
      if (err) next(err);
      res.json(successIndicator);
    });
  });
  
module.exports = UserRouter;