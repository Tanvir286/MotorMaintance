const mongoose = require('mongoose');
const { Schema } = mongoose;

const blogSchema = new Schema({
    title:{
        type: String,
    },
    description: {
        type: String,      
    },
    images: {
        type: [String],
    },
    status:{
        type: String,
    },
    comment:{
        type: String,
        
    }
});

module.exports = mongoose.model('blog', blogSchema);
