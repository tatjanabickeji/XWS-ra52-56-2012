var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// kreiramo novu shemu
var taskSchema = new Schema({
  code: {
    type : String,
    required : true,
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
  },
  creator: {
    
        type: Schema.Types.ObjectId,
        ref: 'User'
       },
  
  assigned_to: {
      type: Schema.Types.ObjectId,
      ref: 'User'
  },
  
  status:{
      type: Schema.Types.Mixed,
      required: true
  },
  priority:{type: Schema.Types.Mixed
  },
  comments:[{
         type: Schema.Types.ObjectId,
         ref: 'Comment'
                }],
  deadline: Date,
  createdAt: Date,
  updatedAt: Date,
  taskUpdateHistory:[] //celi objekti task-a ovde
});


// prilikom snimanja se postavi datum
taskSchema.pre('save', function(next) {
  // preuzmemo trenutni datum
  var currentDate = new Date();
  // postavimo trenutni datum poslednju izmenu
  this.updatedAt = currentDate;


  // ako nije postavljena vrednost za createdAt, postavimo je
  if (!this.createdAt){
    this.createdAt = currentDate;
    //this.taskUpdateHistory[0].dateOfChange = currentDate;
    }
  // predjemo na sledecu funckiju u lancu
  next();
});



// od sheme kreiramo model koji cemo koristiti
var Task = mongoose.model('Task', taskSchema);

// publikujemo kreirani model
module.exports = Task;
