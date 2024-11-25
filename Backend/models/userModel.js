const mongoose = require('mongoose');
const {Schema} = mongoose
  
const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 50
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        min: [8, 'Must be at least 6, got {VALUE}']
    },
    role:{
        type: String,
        default: "user"
    },
    emailVerify:{
        type: Boolean,
        default: true 
    }

  });

  module.exports = mongoose.model('users', userSchema);


    