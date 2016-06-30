var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password:{
      type: String,
      required: true 
  },
  role:{
      type: Boolean,
      required: true
  }
  
});
/*
userSchema.pre('save', function(next) {
  next();
});
  */  
    // od sheme kreiramo model koji cemo koristiti
var User = mongoose.model('User', userSchema);
// publikujemo kreirani model
module.exports = User;
    
    
    