var express = require('express');
//var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
// koristimo mongoose model koju smo kreirali u folderu model

var Task = require(__dirname+'/../model/Task'); // get the mongoose model
var Project = require(__dirname+'/../model/Project'); // get the mongoose model
var User = require(__dirname+'/../model/User'); // get the mongoose model
var Comment = require(__dirname+'/../model/Comment'); // get the mongoose model

var CommentRouter = express.Router();

var populateQuery = {
                path: "comments",
                model: "Comment",
                populate : 
                    { path: "creator", model:"User"}
            };

CommentRouter
    .get('/comment/:commentID', function(req,res,next){
        //todo: populate creator.username
    Comment.findOne({"_id" : req.params.commentID}, function (err,data) {
      if (err) next(err);
      res.json(data);
    })
  })
  .get('/comments/:taskID',function(req,res,next){
    
    Task.findOne({"_id":req.params.taskID}).populate(populateQuery)
        .exec(function(err,data){
     
        if(err) next(err);     
        res.json(data.comments);
  });
  })
  .post('/addComment/:taskID', function(req, res, next) {
    var comment = new Comment(req.body);
    comment.creator = req.session.user._id;
    comment.save(function (err) {
      if (err) next(err);
    });
    
    Task.findOne({"_id" : req.params.taskID}).exec(
      function(err,data){
        if(err) next(err);
        
        var task = data;
        task.comments.push(comment._id);
        task.save(function(err) {
            if (err) next(err);
            task.populate(populateQuery,function(err) {
                if (err) next(err);
                res.json(task);
            });
        });
      });
  })
  .post('/changeComment', function (req,res,next) {
      var commentID = req.body.commentID;
      var text = req.body.text;
      
      Comment.findOne({"_id" : commentID}, function (err,data) {
          if (err) next(err);
          var comment = data;
          if (comment) {
              comment.text = text;
              comment.save(function(err) {
                  if (err) next(err);
                  res.json(comment);
              });
          }
      })
  })
  .delete('/comment/:commentID', function(req,res,next) {
      var taskID = req.body.taskID;
      var commentID =req.params.commentID;
      Comment.remove({"_id" : commentID}, function(err,data) {
          if (err) next(err);
      });
      Task.findOne({"_id" : taskID}).populate(populateQuery).exec(function(err,data) {
          if (err) next(err);
          var task = data;
          var coms = task.comments;
          var index = coms.indexOf(commentID);
          if (index > -1) {
              coms.splice(index,1);
          }
          task.save(function(err) {
              if (err) next(err);
              res.json(task);
          });
      });
  });


module.exports = CommentRouter;