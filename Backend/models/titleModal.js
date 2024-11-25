const mongoose = require('mongoose');
const { Schema } = mongoose;

const titleSchema = new Schema({
    title:{
        type: String,
    }
   
});

module.exports = mongoose.model('list', titleSchema);
