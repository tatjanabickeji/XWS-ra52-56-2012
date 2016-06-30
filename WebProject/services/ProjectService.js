var express = require('express');
//var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
// koristimo mongoose model koju smo kreirali u folderu model

var Project = require(__dirname+'/../model/Project'); // get the mongoose model


var ProjectRouter = express.Router();

ProjectRouter
  .get('/projects/', function(req, res) {
    if (req.session.user.role) {
        Project.find({}).populate('usersOnProject').populate('tasks').exec( function(err, data, next) {
          if (err) next(err);
          res.json(data);
        });
    }
    else {
        Project.find({'usersOnProject' : req.session.user._id}).populate('usersOnProject').exec(
         function(err,data,next) {
          if (err) next(err);
          //console.log(pera);
          res.json(data);
        })
    }
  })
  .get('/projects/:id', function(req, res) {
    var populateQuery = [{
      path : "tasks",
      model: "Task",
      populate : [
          { path: "creator", model:"User"},
          { path: "assigned_to", model:"User"}
        ]
    }, 
    {
      path : "creator",
      model: "User"
    },
    {
      path: "usersOnProject",
      model:"User"
    }];
    
    Project.findOne({
      "_id" : req.params.id
    }).populate(populateQuery)
    .exec(function(err, data) {
      if (err) console.log(err);
      res.json(data);
    });
  })
  .get('/projectsForUser/:userID', function (req,res,next) {
    //todo: staviti req.session.user._id umesto parametra
    Project.find({'usersOnProject' : req.params.userID}, function(err,data) {
      if (err) next(err);
      //console.log(pera);
      res.json(data);
    })
  })
  .get("/getProjectForTask/:taskID", function(req,res,next) {
    Project.findOne({'tasks' : req.params.taskID}, function(err,data) {
    if (err) next(err);
    res.json(data);
    }) 
  })
  .post('/addProject', function(req, res, next) {
    var project = new Project(req.body);
    project.creator = req.session.user._id;
    project.save(function(err, data) {
      if (err) console.log(err);
      
      res.json({success:true,data:data});

    });
  })
  .post('/setUsersOnProject/:projectID', function(req, res, next){
    Project.findOne({"_id" : req.params.projectID}
    ).exec(function(err,data){
      if(err) next(err);
      var project = data;
      project.usersOnProject = req.body;
      project.populate('tasks',function(err) {
        if (err) console.log(err);
        for (var i = 0; i < project.tasks.length; i++) {
          if (project.usersOnProject.indexOf(project.tasks[i].assigned_to) == -1) {
            project.tasks[i].assigned_to = null;
            
            // promena taska - verzije
            var taskChanges = {};
            taskChanges.assigned_to = null;
            taskChanges.title = project.tasks[i].title;
            taskChanges.description = project.tasks[i].description;
            taskChanges.status = project.tasks[i].status;
            taskChanges.priority = project.tasks[i].priority;
            taskChanges.deadline = project.tasks[i].deadline;
            
            project.tasks[i].taskUpdateHistory.push({dateOfChange : new Date(), taskChanges:taskChanges });
            project.tasks[i].save();
          }
        }
        
        project.save(function (err2) {
        if (err2) next(err2);
        project.populate('usersOnProject',function (err3) {
          if (err3) next(err3);
          res.json(project);
        });
        
      });
      })
      
    });
  })
  .delete('/project/:id', function(req, res, next) {
      Project.remove({
        "_id": req.params.id
        }, function(err, successIndicator) {
      if (err) next(err);
        res.json(successIndicator);
      });
    });
  
  
  
module.exports = ProjectRouter;