var express = require('express');
//var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
// koristimo mongoose model koju smo kreirali u folderu model

var User = require(__dirname+'/../model/User'); // get the mongoose model

var AuthRouter = express.Router(); // koristimo express Router

// definisanje ruta za usera
AuthRouter
  .get('/auth', function(req, res) {

      if(!req.session.user){
      	res.send({success: false});
      }else{
      	res.send({success: true,user: req.session.user});
      }
  })   
  .post('/signUp', function(req, res, next) {
    var user = new User(req.body);
    user.role = false;
    console.log('JSON:' + req.body);
    req.session.user = user;
    user.save(function(err) {
      if (err) console.log(err);
      var toSend = user;
      
      res.json({success: true,user: toSend});
    });
    
    
  })
   .post('/signIn', function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    
    User.findOne({
      "username": username,
      "password" : password
    }).exec(function(err, user) {
      // ako se desila greska predjemo na sledeci middleware (za rukovanje greskama)
      if (err) next(err);
      if(!user)
      {
        res.send({success: false, msg: 'Authentication failed. Wrong username or password.'});
        next();
      }
      else{
        req.session.user = user;
        res.send({success: true, user:user});
      }
    });
  })
  .post('/signOut', function(req, res) {

      if(req.session.user){
      //TODO neki normalan reset sesije
      	//req.session.user=null;

        req.session.destroy(function(err) {
            // cannot access session here
           // console.log('nema sessijee');
        });

        res.send({success: true, msg:"Logged out"});
      }else{
      	res.send({success: true, msg:"Nikog nema svakako"});
      }

  });;
  
module.exports = AuthRouter;