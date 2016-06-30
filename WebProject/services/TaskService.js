var express = require('express');
//var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
// koristimo mongoose model koju smo kreirali u folderu model

var Task = require(__dirname+'/../model/Task'); // get the mongoose model
var Project = require(__dirname+'/../model/Project'); // get the mongoose model
var User = require(__dirname+'/../model/User'); // get the mongoose model

var TaskRouter = express.Router();
 var populateQuery = {
      path: "comments",
      model: "Comment",
      populate : 
          { path: "creator", model:"User"}
    };
TaskRouter
  .get('/tasks/:taskID', function(req,res,next){
   
    
    Task.findOne({"_id" : req.params.taskID}, function (err) {
      if (err) next(err);
      //res.json(data);
    }).populate('assigned_to').populate(populateQuery).populate('creator')
    .exec(function(err,data){
      if(err) next(err);
      res.json(data);
    })
  })
  .get('/tasks',function(req,res,next){
    
   if (req.session.user.role) {
        Task.find({}).populate('creator').populate('assigned_to').exec(function(err, data) {
          if (err) next(err);
          res.json(data);
        });
    }
    else {
        Task.find({'assigned_to' : req.session.user._id}).populate('creator').populate('assigned_to')
        .exec(function(err,data) {
          if (err) next(err);
          res.json(data);
        });
    }
  })
  .get('/tasksForProject/:projectID', function(req, res) {
    // vraca sve taskove na datom projektu
    Project.findOne({"_id":req.params.projectID}, function(err,data, next) {
      if(err) next(err);
      
      if(data.tasks.length > 0){
        res.json({success: true ,tasks : data.tasks});  
      }
      else{
          res.json({success : false ,msg: "No tasks yet!"});
      }  
    });
  })
  .get('/tasksForUser/:userID',function(req, res) {
    // vraca sve taskove za datog usera
    Task.find({"assigned_to":req.params.userID}, function(err,data, next) {
      if(err) next(err);
      
      if(data.length>0){
        res.json({success: true ,tasks : data});  
      }
      else{
          res.json({success : false ,msg: "No tasks for this user!"});
      }  
    });
  })
  .post('/changeTask/:taskId', function (req,res,next) {
    var user = req.session.user;
    var changes = req.body;
    var taskID = req.params.taskId;
    
    Task.findOne({"_id" : taskID}).populate('creator').populate(populateQuery).exec(function (err, data) {
      if (err) next(err);
      var task = data;
      
      for (var property in changes) {
          if (property != "_id") {
            for (var taskProperty in task._doc) {//todo: smisliti nesto lepse od _doc
              if (property === taskProperty) {
                task[taskProperty] = changes[property];
                break;
              }
            }
          }
      }
      var taskUpdate = { "taskChanges": changes, "dateOfChange" : new Date()}; //todo: staviti req.session.user._id
      task.taskUpdateHistory.push(taskUpdate);
      //task.status = STATUS.INPROGRESS;
      task.save(function(err) {
        if (err) next(err);
        task.populate('assigned_to');
        res.json(task);
      });
      
    })
  })
  .post('/task/:projectID', function(req,res,next) {
    var task = new Task(req.body);
    task.creator = req.session.user._id;
    
    var taskV1 = {};
    taskV1.title = task.title;
    taskV1.description = task.description;
    taskV1.status = task.status;
    taskV1.priority = task.priority;
    taskV1.deadline = task.deadline;
    //taskV1.assigned_to = task.assigned_to;
    
    User.findOne({"_id" : task.assigned_to}, function (err, data) {
      if (err) console.log(err);
      taskV1.assigned_to = data;
    });
    
    
    var taskUpdate = { "taskChanges": taskV1, "dateOfChange" : new Date()};
    task.taskUpdateHistory.push(taskUpdate); //prva verzija za cuvanje.

    
    
    Project.findOne({"_id" : req.params.projectID},
      function(err,data){
        if(err) next(err);
        var project = data;
        project.tasks.push(task._id);
        project.taskNumber += 1;
        task.code = project.code + "_" + project.taskNumber;
        task.save(function (err) {
            if (err) console.log(err);
            task.populate('creator').populate('assigned_to');
        });
        
        project.save(function(err) {
          if (err) console.log(err);
          res.json(project);
        });
        
      });
  });
  
  
  module.exports = TaskRouter;