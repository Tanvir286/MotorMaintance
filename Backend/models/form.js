// backend/models/Form.js
const mongoose = require('mongoose');

const FormSchema = new mongoose.Schema({
  title: { type: String, required: true },
  inputs: [
    {
      name: { type: String, required: true },
      image: { type: String },
      status: { type: String }
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('Form', FormSchema);
